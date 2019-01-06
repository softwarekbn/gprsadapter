import json

import tornado as tornado
from bson import json_util
from flask import Flask, jsonify, request, request, Response
from pymongo import MongoClient
from flask_restful import Resource, Api

import jwt
from flask_jwt import JWT
from flask_cors import CORS, cross_origin
from security import authorization
from bson.json_util import dumps
# database connection define
client = MongoClient('mongodb://localhost', 27017)
# database name
db = client['gprs']
# database collection name will be use in class
gps = db['gps']
controller = db['controller']
users = db['user']
roles = db['roles']
devices = db['devices']
# defining server url and port
# serverurl = '192.168.43.52'
serverurl = '192.168.42.220'
port = 5000
# define flask app
app = Flask(__name__)
api = Api(app)
CORS(app)


# chrCur="11.2-5-6-0-6-3-78-222.33-665.235"
class Controllersr(Resource):
    def get(self):
        output = []
        for s in controller.find({}, {'_id': False}):
            output.append(s)
        return jsonify({'result': output})
        # data=controller.find_one({},{'_id':False})
        # print(data)
        # return jsonify(data)

    def post(self):
        data = request.args['chrCur']
        a = controller.find().count()
        count = a + 1
        BatV, ChrCur, Spv, Mode, Daily, Mon, Percent, Lat, Lon = data.split("-")
        controller.insert({
            "gId": count,
            "batteryVoltage": BatV,
            "chargingCurrent": ChrCur,
            "solarVoltage": Spv,
            "mode": Mode,
            "daily": Daily,
            "monthly": Mon,
            "percent": Percent,
            "latitude": Lat,
            "longitude": Lon
        })
        print(BatV)
        return {'Data': [{
            "batteryVoltage": BatV,
            "chargingCurrent": ChrCur,
            "solarVoltage": Spv,
            "mode": Mode,
            "daily": Daily,
            "monthly": Mon,
            "percent": Percent,
            "latitude": Lat,
            "longitude": Lon
        }]}


api.add_resource(Controllersr, '/controller')


class UsersAll(Resource):
    def get(self,userName):
        # page = request.args['pageNum']
        # print(type(page))
        # skips = 10 * (int(page) - 1)
        output = []
        for s in users.find({"userName":userName}, {'_id': False, "password": False}):  # .skip(skips).limit(10):
            output.append(s)
        return jsonify(output)

    def post(self):
        data = request.json
        a = controller.find().count()
        count = a + 1
        users.save(data)
        return {"Response": "success"}

    def put(self):
        pass

    def delete(self):
        mycol.delete_one({"userId"})


api.add_resource(UsersAll, '/api/Account/Users/<string:userName>')


class createuser(Resource):
    def post(self):
        data = request.json
        a = users.find().count()
        count = a + 1
        users.save(data)
        return {"Response": "success"}
api.add_resource(createuser, '/api/account/register')

class UsersOne(Resource):
    def get(self, id):
        data = users.find_one({"userId": id}, {'_id': False, "password": False})
        return jsonify(data)

    def put(self, id):
        data = request.json
        users.update_one({"userId": id}, {"$set": data})
        return ({"Response": "success"})

    def delete(self, id):
        users.delete_one({"userId": id})
        return ({"Response": "success"})


api.add_resource(UsersOne, '/user/one/<int:id>')


class Roles(Resource):
    def get(self):
        output = []
        for s in roles.find({}):  # .skip(skips).limit(10):
            output.append(s)
            print(s)
        a =jsonify(output)
        print(a)
        return(a)

api.add_resource(Roles, '/api/Account/Roles')


#
# class Roles(Resource):
#     def get(self):
#         output = []
#         for s in roles.find({}, {'_id': False}):  # .skip(skips).limit(10):
#             output.append(s)
#         return jsonify(output)
#
# api.add_resource(Roles, '/api/Device/{DeviceID}/Protocol')


class Login(Resource):
    def get(self):
        pass

    def post(self):
        print('Working')
        userName = request.form.get('username')
        print('UserGet')
        print(userName)
        pasw = request.form.get('password')
        print(pasw)

        duser = users.find_one({"userName": userName}, {"_id": False, "userName": 1})['userName']
        print(duser)

        dpass = users.find_one({"userName": duser}, {"_id": False, "password": 1})['password']
        user_data = users.find_one({"userName": duser}, {"_id": False, "password": False})

        if (duser == userName and dpass == pasw):
            # token = authenticate(duser)
            authh = authorization(duser)
            access_token, refresh_token = authh.authenticate()
        else:
            return ({"Response": "Wrong Details"})
        # return jsonify({'token': token})
        return jsonify({'data': {"access_token": access_token,
                                 "refresh_token": refresh_token,
                                 "user_data": user_data
                                 }})

    def put(self):
        pass

    def delete(self):
        pass


class createdevice(Resource):
    def post(self):
        #receive devicename from user
        name = request.json['name']
        #receive displayname from user
        displayName = request.json['displayName']
        Protocol = ''
        fuc = '''
        function getNextSequenceValue(sequenceName){
        var sequenceDocument = db.deviceSequence.findAndModify(
            {
         query:{_id:sequenceName},
         update:{$inc:{sequence_value:1}},
         new:true
     });
     return sequenceDocument.sequence_value;
}
'''
        db.devices.insert({
             "_id": db.eval(fuc, "deviceId"),
            "name": name,
            "displayName": displayName,
            "Protocol":Protocol
        })
api.add_resource(createdevice, '/createdevice')

class createprotocol(Resource):
    def post(self,deviceId):
        data = request.json
        print(data)
        output = []
        for item in db.devices.find({'_id':deviceId}):
            output.append(item)
            print(output)
        if(output):
            print("if working")
            set_value = {}
            set_value['Protocol'] = data
            db.devices.update({'_id': deviceId},{'$set': set_value})
            return {"Response": "success"}
        else:
            return Response("{'Response': 'Error'}", 503, mimetype='application/json')
api.add_resource(createprotocol, '/api/Device/<int:deviceId>/Protocol')

class createprotocolobject(Resource):
    def post(self,deviceId):
        fuc = '''
                function getNextSequenceValue(sequenceName){
                var sequenceDocument = db.deviceProtocolObjectSequence.findAndModify(
                    {
                 query:{_id:sequenceName},
                 update:{$inc:{sequence_value:1}},
                 new:true
             });
             return sequenceDocument.sequence_value;
        }
        '''
        name = request.json['name']
        print(name)
        displayName = request.json['displayName']
        print(displayName)
        unit = request.json['unit']
        print(unit)
        order = request.json['order']
        print(order)
        correcttodecimalplace = request.json['correcttodecimalplace']
        print(correcttodecimalplace)
        output = []
        for item in db.devices.find({'_id':deviceId}):
            output.append(item)
            print(output)
        if(output):
            print("if working")
            # set_value = {}
            # set_value['Objects'] = data
            objectcount = db.devices.distinct("Protocol.Objects",{"_id":deviceId})
            print("Count Printed")
            print(len(objectcount))
            print("Count Done")
            # objlength = print(len(objectcount))
            # print(objlength)
            print("C Working")
            c = "Protocol.Objects." + str((len(objectcount)))
            print("C Ending")
            print("c printed",c)
            db.devices.update({'_id': deviceId}, {'$set': {"{}".format(c): {"id": db.eval(fuc, "protocolObjectId"), "name": name, "displayName": displayName, "unit": unit, "order": order, "correcttodecimalplace": correcttodecimalplace}}})
            return {"Response": "success"}
        else:
            return Response("{'Response': 'Error'}", 503, mimetype='application/json')
api.add_resource(createprotocolobject, '/api/Device/<int:deviceId>/object')


class getdevicesbyid(Resource):
    def get(self,deviceId):
        # page = request.args['pageNum']
        # print(type(page))
        # skips = 10 * (int(page) - 1)
        output = []
        for s in devices.find({"_id":deviceId},{"name":1,"displayName":1}):  # .skip(skips).limit(10):
            output.append(s)
        return jsonify(output)

api.add_resource(getdevicesbyid, '/api/device/<int:deviceId>')

class getprotocoldevicesbyid(Resource):
    def get(self,deviceId):
        # page = request.args['pageNum']
        # print(type(page))
        # skips = 10 * (int(page) - 1)
        output = []
        for s in devices.find({"_id":deviceId},{"Protocol.communicationstartswith":1,"Protocol.communiactionendswith":1,"Protocol.valueSeparator":1,"Protocol.recordSeparator":1,"_id":False}):  # .skip(skips).limit(10):
            output.append(s)
        return jsonify(output)

api.add_resource(getprotocoldevicesbyid, '/api/deviceProtocol/<int:deviceId>')

class getprotocolobjectbydevicesId(Resource):
    def get(self,deviceId):
        # page = request.args['pageNum']
        # print(type(page))
        # skips = 10 * (int(page) - 1)
        output = []
        for s in devices.find({"_id":deviceId},{"Protocol.Objects.name":1,"Protocol.Objects.displayName":1,"Protocol.Objects.unit":1,"Protocol.Objects.order":1,"Protocol.Objects.correcttodecimalplace":1,"_id":False}):  # .skip(skips).limit(10):
            output.append(s)
        return jsonify(output)

api.add_resource(getprotocolobjectbydevicesId, '/api/deviceProtocolobject/<int:deviceId>')





if __name__ == '__main__':
    app.run(debug=True, host=serverurl, port=port)

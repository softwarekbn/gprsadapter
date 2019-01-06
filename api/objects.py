from flask import Flask, jsonify, request, request, Response
from pymongo import MongoClient
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
from security import authorization
client = MongoClient('mongodb://localhost', 27017)

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


class object(Resource):
    def get(self,deviceId):
        # page = request.args['pageNum']
        # print(type(page))
        # skips = 10 * (int(page) - 1)
        output = []
        for s in devices.find({"_id":deviceId},{"Protocol.Objects.name":1,"Protocol.Objects.displayName":1,"Protocol.Objects.unit":1,"Protocol.Objects.order":1,"Protocol.Objects.correcttodecimalplace":1,"_id":False}):  # .skip(skips).limit(10):
            output.append(s)
        return jsonify(output)
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



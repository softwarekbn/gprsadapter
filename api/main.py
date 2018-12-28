from flask import Flask, jsonify,request,request
from pymongo import MongoClient
from flask_restful import Resource, Api

import jwt
from flask_jwt import JWT
from flask_cors import CORS
from security import authorization



# database connection define
client = MongoClient('mongodb://localhost',27017)
# database name
db = client['gprs']
# database collection name will be use in class
gps=db['gps']
controller=db['controller']
users=db['user']
# defining server url and port 
# serverurl = '192.168.43.52'
serverurl = '127.0.0.1'
port=5000
# define flask app
app = Flask(__name__)
api = Api(app)
CORS(app)



#chrCur="11.2-5-6-0-6-3-78-222.33-665.235"
class Controllersr(Resource):
    def get(self):
   
        output = []
        for s in controller.find({},{'_id':False}):
            output.append(s)
        return jsonify({'result' : output})
        # data=controller.find_one({},{'_id':False})
        # print(data)
        # return jsonify(data) 

    def post(self):
        data = request.args['chrCur']
        a=controller.find().count()
        count=a+1
        BatV , ChrCur, Spv, Mode, Daily, Mon, Percent, Lat, Lon = data.split("-")
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
    def get(self):
        # page = request.args['pageNum']
        # print(type(page))
        # skips = 10 * (int(page) - 1)
        output = []
        for s in users.find({},{'_id':False, "password": False}):#.skip(skips).limit(10):
            output.append(s)
        return jsonify({'result' : output})       
    def post(self):
        data = request.json
        a=controller.find().count()
        count=a+1
        users.save( data )
        return {"Response":"success"}
    def put(self):
        pass
    def delete(self):
        mycol.delete_one({"userId"})
api.add_resource(UsersAll, '/user')

class UsersOne(Resource):
    def get(self, id):
        data = users.find_one({"userId":id},{'_id':False, "password": False})  
        return jsonify(data)     
    def put(self, id):
        data = request.json
        users.update_one({"userId":id},{ "$set": data})
        return ({"Response": "success"}) 
    def delete(self, id):
        users.delete_one({"userId":id})
        return ({"Response": "success"})

api.add_resource(UsersOne, '/user/one/<int:id>')

class Login(Resource):
    def get(self):
        pass
    def post(self):
        userName = request.json.get('userName')
        print(userName)
        pasw = request.json.get('password')
        print(pasw)

        duser = users.find_one({"userName": userName},{"_id":False, "userName": 1})["userName"]
        print(duser)

        dpass = users.find_one({"userName": duser},{"_id":False,"password": 1})["password"]
        user_data = users.find_one({"userName": duser},{"_id":False,"password": False})

        if (duser== userName and dpass==pasw):
            # token = authenticate(duser)  
            authh = authorization(duser)
            access_token, refresh_token = authh.authenticate()  
        else:
            return 'Wrong Details'
        # return jsonify({'token': token})
        return jsonify({'data': {"access_token":access_token,
                                    "refresh_token": refresh_token,
                                    "user_data": user_data        
                                 }})
    def put(self):
        pass
    def delete(self):
        pass
api.add_resource(Login, '/login')


if __name__ == '__main__':
    app.run(debug=True,host=serverurl,port=port)
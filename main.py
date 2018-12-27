from flask import Flask, jsonify,request,request
from pymongo import MongoClient
from flask_restful import Resource, Api
from security import authenticate, identity
import jwt
from flask_jwt import JWT
from flask_cors import CORS

# database connection define
client = MongoClient('mongodb://localhost',27017)
# database name
db = client['gprs']
# database collection name will be use in class
gps=db['gps']
controller=db['controller']
user=db['user']
# defining server url and port 
serverurl = '192.168.43.52'
port=5000
# define flask app
app = Flask(__name__)
api = Api(app)
CORS(app)
app.secret_key = 'kbnsystems'

jwt = JWT(app, authenticate,identity)


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

class Users(Resource):
    def get(self):
        pass
    def post(self):
        pass
    def put(self):
        pass
    def delete(self):
        pass
api.add_resource(Users, '/user')

class Login(Resource):
    def get(self):
        pass
    def post(self):
        user = request.json.get('userName')
        pasw = request.json.get('password')
        print(user)
        print(pasw)
        data,user = authenticate(user ,pasw)
        return jsonify({'token': data})
        # return jsonify({'token': [{"data":data,
        #                             "user": user        
        #                          }]})
    def put(self):
        pass
    def delete(self):
        pass
api.add_resource(Login, '/login')


if __name__ == '__main__':
    app.run(debug=True,host=serverurl,port=port)
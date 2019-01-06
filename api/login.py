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
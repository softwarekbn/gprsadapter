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


class Roles(Resource):
    def get(self):
        output = []
        for s in roles.find({}):  # .skip(skips).limit(10):
            output.append(s)
            print(s)
        a =jsonify(output)
        print(a)
        return(a)



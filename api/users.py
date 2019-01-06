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

class users(Resource):
    def get(self):
        userName = request.args['userName']
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




class user(Resource):
    def get(self, id):
        id = request.args['id']
        data = users.find_one({"userId": id}, {'_id': False, "password": False})
        return jsonify(data)

    def put(self, id):
        id = request.args['id']
        data = request.json
        users.update_one({"userId": id}, {"$set": data})
        return ({"Response": "success"})

    def delete(self, id):
        id = request.args['id']
        users.delete_one({"userId": id})
        return ({"Response": "success"})


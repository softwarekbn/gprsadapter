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

class protocol(Resource):
    def get(self,deviceId):
        # page = request.args['pageNum']
        # print(type(page))
        # skips = 10 * (int(page) - 1)
        output = []
        for s in devices.find({"_id":deviceId},{"Protocol.communicationstartswith":1,"Protocol.communiactionendswith":1,"Protocol.valueSeparator":1,"Protocol.recordSeparator":1,"_id":False}):  # .skip(skips).limit(10):
            output.append(s)
        return jsonify(output)

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


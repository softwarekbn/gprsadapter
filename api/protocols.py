import json

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
        for s in devices.find({"_id":deviceId},{"name":1,"Protocol.communicationstartswith":1,"Protocol.communicationendswith":1,"Protocol.valueseprator":1,"Protocol.recordseprator":1}):  # .skip(skips).limit(10):
            output.append(s)
            print('output',output)
        return jsonify(output)

    def post(self,deviceId):
        print('protocol post working')
        data = request.data
        print(data)
        a = data.decode("utf-8")
        jsondata = json.loads(a)
        communicationstartswith = jsondata['communicationstartswith']
        print('item',communicationstartswith)
        valueseprator = jsondata['valueseprator']
        print('item', valueseprator)
        recordseprator = jsondata['recordseprator']
        print('item', recordseprator)
        communicationendswith = jsondata['communicationendswith']
        print('item', communicationendswith)
        output = []
        for item in db.devices.find({'_id':deviceId}):
            output.append(item)
            print(output)

        if(output):
            print("if working")
            set_value = {}
            set_value['Protocol'] = {"communicationstartswith": communicationstartswith, "valueseprator": valueseprator,
                                     "recordseprator": recordseprator, "communicationendswith": communicationendswith,"Objects":[]}
            db.devices.update({'_id': deviceId},{'$set': set_value})
            # db.devices.update({'_id': deviceId}, {
            #     '$set': {"Protocol.communicationstartswith": communicationstartswith, "Protocol.valueseprator": valueseprator,
            #              "Protocol.recordseprator": recordseprator, "Protocol.communicationendswith": communicationendswith}})
            return {"Response": "success"}
        else:
            return Response("{'Response': 'Error'}", 503, mimetype='application/json')

class Protocols(Resource):
    def get(self,):
        # page = request.args['pageNum']
        # print(type(page))
        # skips = 10 * (int(page) - 1)
        output = []
        for s in devices.find({},{"Protocol.communicationendswith":1,"Protocol.communicationstartswith":1,"Protocol.recordseprator":1,"Protocol.valueseprator":1,"name":1}):
            output.append(s)
            print(output)
        return jsonify(output)
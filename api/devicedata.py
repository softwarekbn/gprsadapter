import json
import operator

from flask import jsonify,request
from flask_restful import Resource
from connection import *
# chrCur="11.2-5-6-0-6-3-78-222.33-665.235"
class data(Resource):
    print('controller working')
    def get(self):
        output = []
        for s in data.find({}, {'_id': False}):
            output.append(s)
        return jsonify({'result': output})
        # data=controller.find_one({},{'_id':False})
        # print(data)
        # return jsonify(data)

    def post(self):
        deviceId = request.args['deviceId']
        intdeviceid = int(deviceId)
        print('deviceId',intdeviceid)
        data = request.args['deviceData']
        print('deviceData',data)
        for protocol  in db.devices.find({"_id": intdeviceid}):
            #protocol = db.devices.find_one({"_id":deviceId},{"Protocol.communicationstartswith":1,"Protocol.communicationendswith":1,"Protocol.valueseprator":1,"Protocol.recordseprator":1})
            print(type(protocol))
            protocold =json.dumps(protocol)
            protocolj = json.loads(protocold)
            communicationstartswith = protocolj['Protocol']['communicationstartswith']
            print(communicationstartswith)
            valueseprator = protocolj['Protocol']['valueseprator']
            print(valueseprator )
            recordseprator = protocolj['Protocol']['recordseprator']
            print(recordseprator)
            communicationendswith = protocolj['Protocol']['communicationendswith']
            print(communicationendswith)

        lengthofdata = len(data)
        print(lengthofdata)
        stringend = lengthofdata-2
        print(stringend)
        if(data[0]==communicationstartswith):
            print('startworking')
            new_data = data[1:lengthofdata]
            print(new_data)
            if(data[lengthofdata-1]==communicationendswith):
                print('end working')
                finaldata = new_data[0:stringend]
                print(finaldata)
                output = []
                for s in db.devices.distinct("Protocol.Objects", {"_id": intdeviceid}):
                    output.append(s)
                    print(output)
                print(len(output))
                maindata = finaldata.split('/')
                print(maindata)
                objectname = [d['name'] for d in output]
                print(objectname)
                c = dict(zip(objectname, maindata))
                print(c)
                db.device.save(c)









        return {"success"}






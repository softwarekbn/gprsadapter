import json
import operator
import re

from flask import jsonify,request
from flask_restful import Resource
from connection import *
# chrCur="11.2-5-6-0-6-3-78-222.33-665.235"
class data(Resource):
    print('controller working')
    def get(self,deviceId):
        output = []
        # device_id = request.args['deviceId']
        # print('deviceid',device_id)
        # int_device_id = int(device_id)
        for s in db.controller.find({"deviceId":deviceId}, {'_id': False}):
            output.append(s)
        return jsonify(output)

class datain(Resource):
    def post(self):
        # receive deviceid
        device_id = request.args['deviceId']

        # convert deviceid into integer
        int_device_id = int(device_id)
        print('deviceId', int_device_id)

        # receive data
        data = request.args['deviceData']
        print('deviceData', data)

        # get protocol from database
        for protocol in db.devices.find({"_id": int_device_id}):

            #check type of protocol
            print('type of protocol', type(protocol))


            # get communicationstartswith from protocol and save it into variable communicationstartswith
            communicationstartswith = protocol['Protocol']['communicationstartswith']
            print(communicationstartswith)

            # get valueseprator from protocol and save it into variable valueseprator
            valueseprator = protocol['Protocol']['valueseprator']
            print(valueseprator)

            # get recordseprator from protocol and save it into variable recordseprator
            recordseprator = protocol['Protocol']['recordseprator']
            print(recordseprator)

            # get communicationendswith from protocol and save it into variable communicationendswith
            communicationendswith = protocol['Protocol']['communicationendswith']
            print(communicationendswith)

        # length of data from device
        lengthofdata = len(data)
        print(lengthofdata)
        stringend = lengthofdata-2
        print(stringend)

        # check starting of  communication
        if(data[0]==communicationstartswith):
            print('startworking')
            new_data = data[1:lengthofdata]
            print(new_data)
            output = []
            for s in db.devices.distinct("Protocol.Objects", {"_id": int_device_id}):
                output.append(s)
                print(output)
            print(len(output))

            # get name from objects
            objectname = [d['name'] for d in output]
            print('objects', objectname)
            # check ending of communication
            if(data[lengthofdata-1]==communicationendswith):
                print('end working')

                # here we get all records
                finaldata = new_data[0:stringend]
                print('finaldata', finaldata)


                a  = re.search('[{}]'.format(recordseprator), finaldata)
                print('yes', a)

                if(a):
                    print('multiple records detected')
                    # here we seperate records
                    records = finaldata.split('{}'.format(recordseprator))
                    print('Records', records)
                    len(records)
                    i=0
                    while i<len(records):
                        for a in records:
                            y= a.split('{}'.format(valueseprator))
                            print('y', y)
                            c = dict(zip(objectname, y))
                            c["deviceId"] = int_device_id
                            print(c,'type of c', type(c))
                            # some_dict = {}
                            # some_dict[device_id] = int_device_id
                            db.controller.save(c)
                            i = i+1
                else:
                    maindata = finaldata.split('{}'.format(valueseprator))
                    print('maindata',maindata)

                    # assign object name to specific data
                    c = dict(zip(objectname, maindata))
                    c["deviceId"] = int_device_id
                    print(c, 'type of c', type(c))

                    # insert data into database
                    db.controller.save(c)

        return jsonify('success')





class location(Resource):
    print('controller working')
    def get(self):
        output = []
        # device_id = request.args['deviceId']
        # print('deviceid',device_id)
        # int_device_id = int(device_id)
        for s in db.controller.find({}, {'_id': False,"latitude":1,"longitude":1}):
            output.append(s)
        return jsonify(output)

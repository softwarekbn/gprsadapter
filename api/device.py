from flask_restful import Resource
from connection import *


class device(Resource):

    print('device working')

    def get(self):

        print('device get working')

        #receive parameter
        # Id = request.args['deviceId']

        #convert received parameter into integer
        # id = int(Id)

        # page = request.args['pageNum']
        # print(type(page))
        # skips = 10 * (int(page) - 1)

        # print(Id)

        #define array
        output = []

        #itrating object
        for s in devices.find({}, {"_id": 1,"name":1,"displayName":1}):
            output.append(s)

        #return final jsonify response
        return jsonify(output)



    def post(self):
        #receive devicename from user
        print('working')
        a = request.data
        print(a)
        name = request.json['userName']
        #receive displayname from user
        displayName = request.json['firstName']
        Protocol = ''
        #creating a function for autoincrement
        fuc = '''
        function getNextSequenceValue(sequenceName){
        var sequenceDocument = db.deviceSequence.findAndModify(
            {
         query:{_id:sequenceName},
         update:{$inc:{sequence_value:1}},
         new:true
     });
     return sequenceDocument.sequence_value;
}
'''
        #insert query
        # {"field":value}
        db.devices.insert({
             "_id": db.eval(fuc, "deviceId"),
            "name": name,
            "displayName": displayName,
            "Protocol":Protocol
        })


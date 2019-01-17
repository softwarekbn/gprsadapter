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
        data = request.args['deviceData']
        protocol = db.devices.find({"_id":deviceId},{"Protocol.communicationstartswith":1,"Protocol.communicationendswith":1,"Protocol.valueseprator":1,"Protocol.recordseprator":1})
        print(protocol)
        a = protocol['communicationendswith']
        print(a)
        a = data.find().count()
        count = a + 1
        BatV, ChrCur, Spv, Mode, Daily, Mon, Percent, Lat, Lon = data.split("-")
        data.insert({
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






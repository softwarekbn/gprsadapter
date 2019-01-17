from flask import jsonify,request
from flask_restful import Resource

# chrCur="11.2-5-6-0-6-3-78-222.33-665.235"
class controllers(Resource):
    print('controller working')
    def get(self):
        output = []
        for s in controller.find({}, {'_id': False}):
            output.append(s)
        return jsonify({'result': output})
        # data=controller.find_one({},{'_id':False})
        # print(data)
        # return jsonify(data)

    def post(self):
        data = request.args['chrCur']
        a = controller.find().count()
        count = a + 1
        BatV, ChrCur, Spv, Mode, Daily, Mon, Percent, Lat, Lon = data.split("-")
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






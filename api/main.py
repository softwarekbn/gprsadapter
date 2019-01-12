from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
from controllers import controller
from device import device
from protocols import protocol
from objects import object
from roles import Roles
from users import users, user
from login import Login

#ip of server
serverurl = '192.168.1.10'
#port
port = 5000
# define flask app
app = Flask(__name__)
api = Api(app)
#for cors-origin
CORS(app)

#Routes
api.add_resource(controller, '/controller')
# create device and get all devices
api.add_resource(device, '/api/Account/Device')
# create protocol and get protocol by deviceid
api.add_resource(protocol, '/api/Account/Device/<int:deviceId>/Protocol')
# create object and get object by deviceid
api.add_resource(object, '/api/Account/Device/<int:deviceId>/Object')
# get all roles
api.add_resource(Roles, '/api/Account/Roles')
# create users and get all users by userName
api.add_resource(users, '/api/Account/Users')
# get, update, delete user by userid
api.add_resource(user, '/api/account/user')
api.add_resource(Login, '/login')


if __name__ == '__main__':
    app.run(debug=True, host=serverurl, port=port)
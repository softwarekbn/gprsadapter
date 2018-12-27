from flask import Flask, jsonify,request,request
import jwt
import datetime
from pymongo import MongoClient

client = MongoClient('mongodb://localhost',27017)
# database name
db = client['gprs']
# database collection name will be use in class
gps=db['gps']
controller=db['controller']
user=db['user']
app = Flask(__name__)

JWT_SECRET = 'secret'
JWT_ALGORITHM = 'HS256'
JWT_EXP_DELTA_SECONDS = 20

def authenticate (username, password):
    duser = user.find_one({"userName": username},{'_id':False, "userName": 1})['userName']

    dpass = user.find_one({"userName": username},{'_id':False,"password": 1})['password']
    print(duser)
    print(dpass)

    if (duser== username and dpass==password):
        jwt_token = jwt.encode({"name":username}, JWT_SECRET, JWT_ALGORITHM)    
        
        return (jwt_token.decode('utf-8'), duser )

    else:
        return 'Wrong Details'
def identity (payload):
    return None
   

 
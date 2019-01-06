from flask import Flask, jsonify, request, request, Response
from pymongo import MongoClient

#mongodb connection
client = MongoClient('mongodb://localhost', 27017)
#gprs is a database
db = client['gprs']
#gps is a collection
gps = db['gps']
#controller is a collection
controller = db['controller']
#user is a collection
users = db['user']
#roles is a collection
roles = db['roles']
#devices is a collection
devices = db['devices']
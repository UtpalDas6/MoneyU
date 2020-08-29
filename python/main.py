'''
author: Utpal Das
'''
import time
from flask import Flask, request
from flask_cors import CORS, cross_origin
from mongo import MongoDB

app = Flask(__name__)

data = dict()

mongo =  MongoDB()

@app.route('/',methods = ['POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def home():
    if request.method == 'POST':
        data = mongo.insertorupdate_transaction(request.data)
        return data

@app.route('/<date>',methods = ['GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def get_current_time(date):
    data = mongo.read_transaction(date)
    return data

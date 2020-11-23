'''
author: Utpal Das
'''
import time
import stripe
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from mongo import MongoDB

app = Flask(__name__)
data = dict()

mongo =  MongoDB()

stripe.api_key = '<stripe secret key>'

@app.route('/',methods = ['POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def home():
    if request.method == 'POST':
        data = mongo.insertorupdate_transaction(request.data)
        return data

@app.route('/<userid>/<date>',methods = ['GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def get_current_time(userid,date):
    data = mongo.read_transaction(userid,date)
    return data

@app.route('/create-checkout-session/<item>/<amount>', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def create_checkout_session(item,amount):
  session = stripe.checkout.Session.create(
    payment_method_types=['card'],
    line_items=[{
      'price_data': {
        'currency': 'inr',
        'product_data': {
          'name': item,
        },
        'unit_amount': int(amount)*100,
      },
      'quantity': 1,
    }],
    mode='payment',
    success_url='https://example.com/success',
    cancel_url='https://example.com/cancel',
  )
  return jsonify(id=session.id)

# -*- coding: utf-8 -*-
"""
Created on Sat Apr 17 19:00:55 2021

Connect: localhost:5000/

@author: larsh, paulilb1
"""

#flask import
import flask
from flask_cors import CORS
from gevent.pywsgi import WSGIServer
app = flask.Flask(__name__)

CORS(app)

#imports
import os
import tweepy
from flask_swagger_ui import get_swaggerui_blueprint

from db import get_user_analyzed
from db import is_twitterHandle_analyzed
from db import is_twitterHandle_in_queue
from db import insert_request_in_queue
from db import get_analyzed_users
from db import get_request_queue_length

consumer_key = os.environ['CONSUMER_KEY_1']
consumer_secret = os.environ['CONSUMER_SECRET_1']
access_token = os.environ['ACCESS_TOKEN_1']
access_token_secret = os.environ['ACCESS_TOKEN_SECRET_1']

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)


SWAGGER_URL = '/docs'

swagger_ui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    '/static/hoehlars-bubblemeterbackend-1.0.0-resolved.json',
    config={
        'app_name': "Bubblemeter Backend"
    }
)

app.register_blueprint(swagger_ui_blueprint, url_prefix=SWAGGER_URL)

@app.route('/get_analysis/<twitterID>')
def get_analysis(twitterID):
    user_analyzed = get_user_analyzed(twitterID)
    
    if user_analyzed == None:
        error_msg = "Analyzed users not found."
        response = {"statusCode": 500, "body": {"msg": error_msg}}
        return response
    
    response = {"statusCode": 200, "body": {"analysis": user_analyzed["analysis"], "currentUser": user_analyzed["currentUser"], "twitterId": user_analyzed["twitterId"], "twitterHandle": user_analyzed["twitterHandle"]}}
    return response

@app.route('/request_analysis/<twitterHandleOrTwitterID>/<email>')
def request_analysis(twitterHandleOrTwitterID, email):
    
    try:
        userStart = api.get_user(screen_name = twitterHandleOrTwitterID)
    except:
        errorMsg = "Account does not exist or can't be found."
        response = {"statusCode": 500, "body": {"msg": errorMsg}}
        return response
    
    if userStart.protected:
        errorMsg = "Protected accounts can't be analysed."
        response = {"statusCode": 500, "body": {"msg": errorMsg}}
        return response
    
    if userStart.friends_count == 0:
        errorMsg = "The account you requested has no friends."
        response = {"statusCode": 500, "body": {"msg": errorMsg}}
        return response
    
    if userStart.friends_count > 1000:
        errorMsg = "Accounts with more than 1000 friends can't be analyzed."
        response = {"statusCode": 500, "body": {"msg": errorMsg}}
        return response
    
    if is_twitterHandle_analyzed(twitterHandleOrTwitterID):
        errorMsg = "Account has already been analyzed."
        response = {"statusCode": 500, "body": {"msg": errorMsg}}
        return response
    
    if is_twitterHandle_in_queue(twitterHandleOrTwitterID):
        errorMsg = "Account has already been requested and is still in the queue."
        response = {"statusCode": 500, "body": {"msg": errorMsg}}
        return response
    
    #inserts user request in queue, without @s
    newTwitterHandleOrTwitterID = twitterHandleOrTwitterID.replace("@","")
    insert_request_in_queue(newTwitterHandleOrTwitterID, email)
    
    successMsg = "User analysis of " + twitterHandleOrTwitterID + " has been requestet"
    response = {"statusCode": 200, "body": {"msg": successMsg}}
    return response

@app.route('/request_analyzed_users')
def request_analysed_users():
    
    analyzed_users = get_analyzed_users()
    
    if len(analyzed_users) == 0:
        response = {"statusCode": 500, "body": {"msg": "No user has been analyzed yet."}}
        return response
    
    response = {"statusCode": 200, "body": {"analyzed_users": analyzed_users }}
    return response

@app.route('/request_queue_length')
def request_queue_length():
    
    queue_length = get_request_queue_length()
    
    response = {"statusCode": 200, "body": {"queue_length": queue_length }}
    return response

if __name__ == "__main__":
    http_server = WSGIServer(('', 5000), app)
    http_server.serve_forever()
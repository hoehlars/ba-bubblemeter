# -*- coding: utf-8 -*-
"""
Created on Sat Apr 17 19:00:55 2021

@author: larsh
"""

import flask

app = flask.Flask(__name__)
app.config["DEBUG"] = True

import pymongo
from datetime import datetime, timedelta
import json

client = pymongo.MongoClient("")

twitterNetworkDb = client["twitterNetworkDb"]

edgeCol = twitterNetworkDb["twitterEdges"]


@app.route('/get_most_influential_nodes/<twitterID>', methods=['GET'])
def get_most_influential_nodes():

    # 1. get all friends_of_friends (collectAllFriends)
    


    # 2. generate directed graph


    # 3. calculate 10 most influential nodes

    
    # 4. return most influential nodes
    
    response = {"statusCode": 200, "body": json.dumps(body)}
    return response

@app.route('/get_politicians_in_network/<twitterID>', methods=['GET'])
def get_politicians_in_network():

    # 1. get all friends_of_friends (collectAllFriends)


    # 2. generate directed graph

    # 3. get politicians

    
    # 4. search through politicians


    # 5. return politicians in network
    
    response = {"statusCode": 200, "body": json.dumps(body)}
    return response


@app.route('/collect_all_friends/<twitterID>', methods=['GET'])
def collect_all_friends():
    
    # 1. get friends_of_friends 
    response = {"statusCode": 200, "body": json.dumps(body)}
    return response

app.run()
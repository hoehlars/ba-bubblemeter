# -*- coding: utf-8 -*-
"""
Created on Sat Apr 17 19:00:55 2021

Connect: localhost:5000/

@author: larsh, paulilb1
"""

#flask import
import flask
app = flask.Flask(__name__)
app.config["DEBUG"] = True

#sys import, used so that files in other directories are found
import sys
sys.path.append("../network")

#imports
import pandas as pd
import json

import networkx as nx
from collectAllFriends import process_friends
from db import get_edges_friends_of_friends
from network import top_k_of_network_sorted_incoming_degree
from network import get_all_NR_and_SR_in_network

#call with twitter id
#returns json object with politicians_in_network and top_ten_most_influential
@app.route('/make_analysis/<twitterID>')
def make_analysis(twitterID):
    
    # get all friends of friends and check if they are in db or not
    process_friends(twitterID)
    
    # get all edges from the db
    edges = get_edges_friends_of_friends(int(twitterID))
    
    # create dataframe and graph
    edges_df = pd.DataFrame(edges)
    G = nx.from_pandas_edgelist(edges_df, 'IDFrom', 'IDTo', create_using=nx.DiGraph())

    # sort by incoming degree
    G_sorted = pd.DataFrame(sorted(G.in_degree, key=lambda x: x[1], reverse=True))
    G_sorted.columns = ['twitter_id','in_degree']
    
    
    k = 10
    ten_most_influential = top_k_of_network_sorted_incoming_degree(k, edges_df)
    politicians_in_network = get_all_NR_and_SR_in_network(edges_df)
    result = ten_most_influential.to_json(orient="split")
    ten_most_influential_parsed = json.loads(result)
    result = politicians_in_network.to_json(orient="split")
    politicians_in_network_parsed = json.loads(result)
    response = {"statusCode": 200, "body": {"politicians_in_network": json.dumps(politicians_in_network_parsed), "top_ten_most_influential": json.dumps(ten_most_influential_parsed) }}
    return response

app.run()
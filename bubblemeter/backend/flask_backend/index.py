# -*- coding: utf-8 -*-
"""
Created on Sat Apr 17 19:00:55 2021

Connect: localhost:5000/

@author: larsh, paulilb1
"""

#flask import
import flask
from flask_cors import CORS, cross_origin
app = flask.Flask(__name__)
app.config["DEBUG"] = True

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#sys import, used so that files in other directories are found
import sys
sys.path.append("../network")

#imports
import pandas as pd
import json

import networkx as nx
from twitter_access import process_friends
from db import get_edges_friends_of_friends, get_amount_of_politicians_in_db
from network import top_k_of_network_sorted_incoming_degree
from network import get_all_NR_and_SR_in_network

#call with twitter id
#returns json object with politicians_in_network and top_ten_most_influential
@app.route('/make_analysis/<twitterID>')
@cross_origin()
def make_analysis(twitterID):
    
    # get all friends of friends and check if they are in db or not
    process_friends(twitterID)
    
    # get all edges from the db
    edges = get_edges_friends_of_friends(int(twitterID))
    
    # create dataframe and graph
    edges_df = pd.DataFrame(edges)
    G = nx.from_pandas_edgelist(edges_df, 'IDFrom', 'IDTo', create_using=nx.DiGraph())

    # sort by incoming degree
    G_sorted_df = pd.DataFrame(sorted(G.in_degree, key=lambda x: x[1], reverse=True))
    G_sorted_df.columns = ['twitter_id','in_degree']
    
    
    # get ten most influential nodes
    k = 10
    ten_most_influential = top_k_of_network_sorted_incoming_degree(k, G_sorted_df)
    
    # get all politicians in network
    politicians_in_network = get_all_NR_and_SR_in_network(G_sorted_df)
    
    # convert to json
    result = ten_most_influential.to_json(orient="split")
    ten_most_influential_json = json.loads(result)
    result = politicians_in_network.to_json(orient="split")
    politicians_in_network_json = json.loads(result)
    response = {"statusCode": 200, "body": {"politicians_in_network": politicians_in_network_json, "top_ten_most_influential": ten_most_influential_json }}
    return response

@app.route('/polit_score/<twitterID>')
@cross_origin()
def polit_score(twitterID):
    
    # get all edges from the db
    edges = get_edges_friends_of_friends(int(twitterID))
    
    # create dataframe and graph
    edges_df = pd.DataFrame(edges)
    G = nx.from_pandas_edgelist(edges_df, 'IDFrom', 'IDTo', create_using=nx.DiGraph())
    
    # sort by incoming degree
    G_sorted_df = pd.DataFrame(sorted(G.in_degree, key=lambda x: x[1], reverse=True))
    G_sorted_df.columns = ['twitter_id','in_degree']
    
    
    
    # get all politicians in network
    politicians_in_network = get_all_NR_and_SR_in_network(G_sorted_df)
    
    size_of_whole_network = G_sorted_df.shape[0]
    amount_of_politicians_in_network = politicians_in_network.shape[0]
    amount_of_politicians_in_db = get_amount_of_politicians_in_db()
    
    
    polit_score = amount_of_politicians_in_network / amount_of_politicians_in_db
    
    response = {"statusCode": 200, "body": {"amount_of_politicians_in_network": amount_of_politicians_in_network, "amount_of_politicians_in_db": amount_of_politicians_in_db, "size_of_whole_network": size_of_whole_network, "polit_score": polit_score}}
    return response
    

app.run()
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


#sys import, used so that files in other directories are found
import sys
sys.path.append("../network")

#imports
import pandas as pd


from twitter_access import process_friends
from db import get_edges_friends_of_friends, get_amount_of_politicians_in_db
from network import top_k_of_network_sorted_incoming_degree
from network import get_all_politicians_in_network
from network import generate_graph
from centroid import compute_centroid_top_k_percent
from centroid import compute_inside_outside_circle
from helpers import df_to_json

MOST_INFLUENTIAL_TOP_COUNT = 10
MOST_INFLUENTIAL_PARTY_POLIT_COUNT = 100
CENTROID_TOP_K_PERCENT_POLIT = 5
RADIUS_AROUND_CENTROID = 16
DF_ROW_COUNT = 0

@app.route('/make_analysis/<twitterID>')
def make_analysis(twitterID):
    
    process_friends(twitterID)
    
    edges = get_edges_friends_of_friends(int(twitterID))
    

    edges_df = pd.DataFrame(edges)
    
    G_sorted_df = generate_graph(edges_df)
    
    ten_most_influential = top_k_of_network_sorted_incoming_degree(MOST_INFLUENTIAL_TOP_COUNT, G_sorted_df)
    
    # check if the twitter user itself is in the top ten list
    if not ten_most_influential[ten_most_influential.twitter_id == int(twitterID)].empty:
    # get top 11 most influential nodes, remove twitter user self
        ten_most_influential = top_k_of_network_sorted_incoming_degree(MOST_INFLUENTIAL_TOP_COUNT + 1, G_sorted_df)
        ten_most_influential = ten_most_influential[ten_most_influential.twitter_id != int(twitterID)]
    
    politicians_in_network = get_all_politicians_in_network(G_sorted_df)
    
    ten_most_influential_json = df_to_json(ten_most_influential)
    politicians_in_network_json = df_to_json(politicians_in_network)
    
    response = {"statusCode": 200, "body": {"politicians_in_network": politicians_in_network_json, "top_ten_most_influential": ten_most_influential_json }}
    return response

@app.route('/polit_score/<twitterID>')
def polit_score(twitterID):
    
    edges = get_edges_friends_of_friends(int(twitterID))
    
    edges_df = pd.DataFrame(edges)
    G_sorted_df = generate_graph(edges_df)
    
    politicians_in_network = get_all_politicians_in_network(G_sorted_df)
    
    size_of_whole_network = G_sorted_df.shape[DF_ROW_COUNT]
    amount_of_politicians_in_network = politicians_in_network.shape[DF_ROW_COUNT]
    amount_of_politicians_in_db = get_amount_of_politicians_in_db()
    
    polit_score = amount_of_politicians_in_network / amount_of_politicians_in_db
    
    response = {"statusCode": 200, "body": {"amount_of_politicians_in_network": amount_of_politicians_in_network, "amount_of_politicians_in_db": amount_of_politicians_in_db, "size_of_whole_network": size_of_whole_network, "polit_score": polit_score}}
    return response

@app.route('/most_influential_party/<twitterID>')
def most_influential_party(twitterID):
    
    edges = get_edges_friends_of_friends(int(twitterID))
    
    edges_df = pd.DataFrame(edges)
    G_sorted_df = generate_graph(edges_df)
    
    politicians_in_network = get_all_politicians_in_network(G_sorted_df)
    
    politicians_in_network_top_100 = politicians_in_network.head(MOST_INFLUENTIAL_PARTY_POLIT_COUNT)
    
    parties = {}
    
    # calculate score for each party with politicians in top 100 
    for index, row in politicians_in_network_top_100.iterrows():
        party = row["partyAbbreviation"]
        in_degree = row["in_degree"]
        
        if not party in parties.keys():
            parties[party] = in_degree
        else:
            parties[party] = parties[party] + in_degree
            
    
    response = {"statusCode": 200, "body": {"parties": parties}}
    return response


@app.route('/centroid/<twitterID>')
def centroid(twitterID):
    
    edges = get_edges_friends_of_friends(int(twitterID))
    
    edges_df = pd.DataFrame(edges)
    
    G_sorted_df = generate_graph(edges_df)
    
    coordinates = compute_centroid_top_k_percent(G_sorted_df, CENTROID_TOP_K_PERCENT_POLIT)

    response = {"statusCode": 200, "body": {"x": coordinates["x"], "y": coordinates["y"]}}
    return response

@app.route('/inner_outer_circle/<twitterID>')
def inner_outer_circle(twitterID):
        
    edges = get_edges_friends_of_friends(int(twitterID))
    
    edges_df = pd.DataFrame(edges)
    
    G_sorted_df = generate_graph(edges_df)
    
    politicians_in_network = compute_inside_outside_circle(G_sorted_df, CENTROID_TOP_K_PERCENT_POLIT, RADIUS_AROUND_CENTROID)
        
    politicians_inside = politicians_in_network[politicians_in_network["isInside"] == True]
    politicians_outside = politicians_in_network[politicians_in_network["isInside"] == False]

    politicians_inside_json = df_to_json(politicians_inside)
    politicians_outside_json = df_to_json(politicians_outside)
    
    response = {"statusCode": 200, "body": {"radius": RADIUS_AROUND_CENTROID, "politicians_inside": politicians_inside_json, "politicians_outside": politicians_outside_json}}
    return response


if __name__ == "__main__":
    http_server = WSGIServer(('', 5000), app)
    http_server.serve_forever()
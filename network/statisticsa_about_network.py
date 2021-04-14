# -*- coding: utf-8 -*-
"""
Created on Tue Apr  6 16:56:25 2021

@author: larsh
"""


import tweepy


import pymongo
from network import top_k_of_network_sorted_incoming_degree
import pandas as pd
from db import get_edges_friends_of_friends
from network import get_all_NR_and_SR_in_network

consumer_key = ''
consumer_secret = ''
access_token = ''
access_token_secret = ''

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)

# relevant DB variables
client = pymongo.MongoClient("")
twitterNetworkDb = client["twitterNetworkDb"]
edgeCol = twitterNetworkDb["twitterEdges"]

percy_id = 3397339312

edges = get_edges_friends_of_friends(percy_id, edgeCol)
    
# Read into a df
edges_df = pd.DataFrame(edges)

# sort network by incoming degree of nodes 
k = 10
sorted_network_df = top_k_of_network_sorted_incoming_degree(k, edges_df)


parlament_df = get_all_NR_and_SR_in_network(sorted_network_df)


"""
k = 10
G_filtered = nx.k_core(G, k) 

print("Number of nodes filtered: {:d}".format(G_filtered.number_of_nodes()))
G_sorted = pd.DataFrame(sorted(G_filtered.degree, key=lambda x: x[1], reverse=True))
G_sorted.columns = ['id','degree']
"""

    


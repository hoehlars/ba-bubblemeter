# -*- coding: utf-8 -*-
"""
Created on Tue Apr  6 16:56:25 2021

@author: larsh
"""


import tweepy
import pandas as pd
import networkx as nx
import matplotlib.pyplot as plt
import math
import numpy as np

consumer_key = ''
consumer_secret = ''
access_token = ''
access_token_secret = ''

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)


# Read into a df
df = pd.read_csv("networkOfFollowers.csv") 


#  turn into a graph
G = nx.from_pandas_edgelist(df, 'source', 'target')



print("Number of nodes total: {:d}".format(G.number_of_nodes()))

G_sorted = pd.DataFrame(sorted(G.degree, key=lambda x: x[1], reverse=True))
G_sorted.columns = ['id','degree']

print(G_sorted.head())


# Exclude nodes with degree less than k
k = 10
G_filtered = nx.k_core(G, k) 

print("Number of nodes filtered: {:d}".format(G_filtered.number_of_nodes()))


G_sorted = pd.DataFrame(sorted(G_filtered.degree, key=lambda x: x[1], reverse=True))
G_sorted.columns = ['id','degree']




top100 = pd.DataFrame(G_sorted.head(100)["id"])

# append usernames
username_list = []
count = 0
total = 100
id_list = top100['id']
for id in id_list:
    count = count + 1
    print("{:d} of {:d}".format(count, total))
    
    formattedId = str(format(id, '.0f'))
    
    try:
        u = api.get_user(formattedId)
    except tweepy.TweepError:
        username_list.append('')
        continue
    
    username_list.append(u.screen_name)
   
# append user_name list to df
top100['username'] = username_list

print(top100.head(20))
    



edges = nx.to_pandas_edgelist(G_filtered)

edges.to_csv("edges.csv", index=False, columns=["source", "target"])

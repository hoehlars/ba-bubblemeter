# -*- coding: utf-8 -*-
"""
Created on Wed Apr 14 09:41:06 2021

@author: larsh
"""


import networkx as nx
import pandas as pd


def top_k_of_network_sorted_incoming_degree(k, edges_df):
    #  turn into a directed graph
    G = nx.from_pandas_edgelist(edges_df, 'IDFrom', 'IDTo', create_using=nx.DiGraph())

    # sort by incoming degree
    G_sorted = pd.DataFrame(sorted(G.in_degree, key=lambda x: x[1], reverse=True))
    G_sorted.columns = ['twitter id','in degree']
    return(G_sorted.head(k))

def get_all_NR_and_SR_in_network(sorted_network_df):
    
    # get NR and SR from db
    politicians = [{"name": "Christian Wasserfallen", "twitterhandle": "cwasi", "twitterID": 50444931},
                 {"name": "Christa Markwald", "twitterhandle": "ChristaMarkwald", "twitterID": 226922317}]
    
    # iterate over network
    politicians_df = pd.DataFrame(columns=["name", "twitter handle", "twitter id", "in degree"])
    
    # find politicians in network and safe in df
    for idx, politician in enumerate(politicians):
        name = politician["name"]
        twitter_id = politician["twitterID"]
        twitter_handle = politician["twitterhandle"]
        
        # search for politician with id, if found --> append it to politicians_df
        politicians_df = politicians_df.append(sorted_network_df[sorted_network_df['twitter id'] == twitter_id], ignore_index=True)
         
        # add name and twitter handle of politician into df
        politicians_df.loc[idx, 'name'] = name
        politicians_df.loc[idx, 'twitter handle'] = twitter_handle
    
    
    # sort after degree before returning
    politicians_df = politicians_df.sort_values('in degree', ascending=False)
    return politicians_df

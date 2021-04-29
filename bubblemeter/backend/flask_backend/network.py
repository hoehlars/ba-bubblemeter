# -*- coding: utf-8 -*-
"""
Created on Wed Apr 14 09:41:06 2021

@author: larsh
"""


import pandas as pd
from db import get_politicians
from twitter_access import get_user_from_id

def top_k_of_network_sorted_incoming_degree(k, G_sorted_df):
    # get top k
    G_top_k = G_sorted_df.head(k)
    
    top_k_df = pd.DataFrame(columns = ['name', 'twitter_handle', 'twitter_id', 'in_degree'])
    
    # append names
    for idx,twitter_id in enumerate(G_top_k['twitter_id']):
        
        top_k_df = top_k_df.append(G_top_k[G_top_k['twitter_id'] == twitter_id], ignore_index=True)
        
        # insert name
        u = get_user_from_id(twitter_id)
        top_k_df.loc[idx, 'name'] = u.name
        top_k_df.loc[idx, 'twitter_handle'] = u.screen_name
    
    
    return top_k_df

def get_all_NR_and_SR_in_network(G_sorted_df):
    politicians = get_politicians()
    
    # iterate over network
    politicians_df = pd.DataFrame(columns=["name", "party",  "twitter_handle", "twitter_id", "in_degree", "smartmap"])
    
    # find politicians in network and safe in df
    idx = 0
    for politician in politicians:
        first_name = politician["vorname"]
        last_name = politician["name"]
        name = first_name + " " + last_name
        twitter_id = politician["id"]
        twitter_handle = politician["handle"]
        party = politician["partei"]
        x_smartmap = politician["x"]
        y_smartmap = politician["y"]
        smartmap = {"smartmap": [x_smartmap, y_smartmap]}
        
        # look if politician is in network
        if not G_sorted_df[G_sorted_df['twitter_id'] == twitter_id].empty:
            
            # search for politician with id, if found --> append it to politicians_df
            politicians_df = politicians_df.append(G_sorted_df[G_sorted_df['twitter_id'] == twitter_id], ignore_index=True)
            # add nametwitter handle, party and smartmap coordinates of politician into df
            politicians_df.loc[idx, 'name'] = name
            politicians_df.loc[idx, 'twitter_handle'] = twitter_handle
            politicians_df.loc[idx, 'party'] = party
            politicians_df.at[idx, 'smartmap'] = smartmap["smartmap"]
            idx = idx + 1
    
    # sort after degree before returning
    politicians_df = politicians_df.sort_values('in_degree', ascending=False)
    
    return politicians_df

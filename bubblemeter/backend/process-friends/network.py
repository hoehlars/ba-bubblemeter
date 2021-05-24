# -*- coding: utf-8 -*-
"""
Created on Wed Apr 14 09:41:06 2021

@author: larsh
"""


import pandas as pd
from db import get_politicians
from db import get_amount_of_politicians_in_db
from twitter_access import get_user_from_id
import networkx as nx


def generate_graph(edges_df):
    G = nx.from_pandas_edgelist(edges_df, 'IDFrom', 'IDTo', create_using=nx.DiGraph())

    # sort by incoming degree
    G_sorted_df = pd.DataFrame(sorted(G.in_degree, key=lambda x: x[1], reverse=True))
    G_sorted_df.columns = ['twitter_id','in_degree']
    return G_sorted_df

def top_k_of_network_sorted_incoming_degree(k, G_sorted_df, twitterID):
    
    G_top_k = G_sorted_df.head(k)
    
    top_k_df = pd.DataFrame(columns = ['name', 'twitter_handle', 'twitter_id', 'in_degree'])
    
    # append names
    for idx,twitter_id in enumerate(G_top_k['twitter_id']):
        
        top_k_df = top_k_df.append(G_top_k[G_top_k['twitter_id'] == twitter_id], ignore_index=True)
        
        # insert name
        u = get_user_from_id(twitter_id)
        top_k_df.loc[idx, 'name'] = u.name
        top_k_df.loc[idx, 'twitter_handle'] = u.screen_name
        
    # check if the twitter user itself is in the top ten list
    if not top_k_df[top_k_df.twitter_id == int(twitterID)].empty:
        # get top k + 1 most influential
        top_k_plus1_influential = top_k_df(k + 1, G_sorted_df)
        
        #exclude user which is in the top 10 user himself/herself
        top_k_df = top_k_plus1_influential[top_k_plus1_influential.twitter_id != int(twitterID)]
        
    return top_k_df
        
    
    
    
    return top_k_df

def get_all_politicians_in_network(G_sorted_df):
    politicians = get_politicians()
    
    politicians_df = pd.DataFrame(columns=["smartMapId", "firstname", "lastname","twitterHandle", "twitterId", "yearOfBirth", "profileImageUrl", "isIncumbent", "isElected", "partyAbbreviation", "partyColor", "__typename", "twitterLink", "x", "y", "in_degree"])
    
    idx = 0
    for politician in politicians:

        # look if politician is in network
        if not G_sorted_df[G_sorted_df['twitter_id'] == politician["twitterId"]].empty:
            
            # search for politician with id, if found --> append it to politicians_df
            politicians_df = politicians_df.append(G_sorted_df[G_sorted_df['twitter_id'] == politician["twitterId"]], ignore_index=True)
            # add additional information into df
            politicians_df.loc[idx, 'smartMapId'] = politician["smartMapId"]
            politicians_df.loc[idx, 'firstname'] = politician["firstname"]
            politicians_df.loc[idx, 'lastname'] = politician["lastname"]
            politicians_df.loc[idx, 'twitterHandle'] = politician["twitterHandle"]
            politicians_df.loc[idx, 'twitterId'] = politician["twitterId"]
            politicians_df.loc[idx, 'yearOfBirth'] = politician["yearOfBirth"]
            politicians_df.loc[idx, 'profileImageUrl'] = politician["profileImageUrl"]
            politicians_df.loc[idx, 'isIncumbent'] = politician["isIncumbent"]
            politicians_df.loc[idx, 'isElected'] = politician["isElected"]
            politicians_df.loc[idx, 'partyAbbreviation'] = politician["partyAbbreviation"]
            politicians_df.loc[idx, 'partyColor'] = politician["partyColor"]
            politicians_df.loc[idx, '__typename'] = politician["__typename"]
            politicians_df.loc[idx, 'twitterLink'] = politician["twitterLink"]
            politicians_df.loc[idx, 'x'] = politician["x"]  
            politicians_df.loc[idx, 'y'] = politician["y"]      
            idx = idx + 1
    
    # sort after degree before returning
    politicians_df = politicians_df.sort_values('in_degree', ascending=False)
    
    # remove appended twitter_id column
    politicians_df = politicians_df.drop('twitter_id', axis=1)
    
    return politicians_df

def compute_polit_score_analysis(G_sorted_df):
    politicians_in_network = get_all_politicians_in_network(G_sorted_df)
    size_of_whole_network = G_sorted_df.shape[0]
    amount_of_politicians_in_network = politicians_in_network.shape[0]
    amount_of_politicians_in_db = get_amount_of_politicians_in_db()
    polit_score = amount_of_politicians_in_network / amount_of_politicians_in_db
    return {"amount_of_politicians_in_network": amount_of_politicians_in_network, "amount_of_politicians_in_db": amount_of_politicians_in_db, "size_of_whole_network": size_of_whole_network, "polit_score": polit_score}


def compute_most_influential_party(G_sorted_df, k):
    politicians_in_network = get_all_politicians_in_network(G_sorted_df)
    
    politicians_in_network_top_100 = politicians_in_network.head(k)
    parties = {}
    # calculate score for each party with politicians in top 100 
    for index, row in politicians_in_network_top_100.iterrows():
        party = row["partyAbbreviation"]
        in_degree = row["in_degree"]
        
        if not party in parties.keys():
            parties[party] = in_degree
        else:
            parties[party] = parties[party] + in_degree
    return parties

    
    
    
    
    
    

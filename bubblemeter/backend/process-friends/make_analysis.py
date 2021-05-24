# -*- coding: utf-8 -*-
"""
Created on Mon May 24 16:13:48 2021

@author: larsh
"""

from db import get_edges_friends_of_friends
from network import generate_graph
from network import top_k_of_network_sorted_incoming_degree
from network import get_all_politicians_in_network
from network import compute_polit_score_analysis
from network import compute_most_influential_party
from helpers import df_to_json
from centroid import compute_centroid_top_k_percent
from centroid import compute_inside_outside_circle
import pandas as pd


MOST_INFLUENTIAL_TOP_COUNT = 10
MOST_INFLUENTIAL_PARTY_POLIT_COUNT = 100
CENTROID_TOP_K_PERCENT_POLIT = 5
RADIUS_AROUND_CENTROID = 16

def make_analysis(twitterID):
    
    # create dict for returning
    analysis = {}
    
    # get all edges from the db
    edges = get_edges_friends_of_friends(int(twitterID))
    edges_df = pd.DataFrame(edges)
    
    # create graph
    G_sorted_df = generate_graph(edges_df)
    
    # ------------ ten_most_influential --------------
    ten_most_influential = top_k_of_network_sorted_incoming_degree(MOST_INFLUENTIAL_TOP_COUNT, G_sorted_df)
    analysis["ten_most_influential"] = df_to_json(ten_most_influential)
    
    # ------------ politicians in network ------------
    politicians_in_network = get_all_politicians_in_network(G_sorted_df)
    analysis["politicians_in_network"] = df_to_json(politicians_in_network)
    
    # ------------ polit_score -----------------------
    polit_score_analysis = compute_polit_score_analysis(G_sorted_df)
    analysis["amount_of_politicians_in_network"] = polit_score_analysis["amount_of_politicians_in_network"]
    analysis["amount_of_politicians_in_db"] = polit_score_analysis["amount_of_politicians_in_db"]
    analysis["size_of_whole_network"] = polit_score_analysis["size_of_whole_network"]
    analysis["polit_score"] = polit_score_analysis["polit_score"]
    
    # ------------ most influential party ------------
    parties = compute_most_influential_party(G_sorted_df, MOST_INFLUENTIAL_PARTY_POLIT_COUNT)
    analysis["parties"] = df_to_json(parties)
    
    # ------------ centroid --------------------------
    coordinates = compute_centroid_top_k_percent(G_sorted_df, CENTROID_TOP_K_PERCENT_POLIT)
    analysis["x"] = coordinates["y"]
    analysis["y"] = coordinates["y"]
    
    # ------------ inner outer circle ----------------
    politicians_in_network = compute_inside_outside_circle(G_sorted_df, CENTROID_TOP_K_PERCENT_POLIT, RADIUS_AROUND_CENTROID)

    politicians_inside = politicians_in_network[politicians_in_network["isInside"] == True]
    politicians_outside = politicians_in_network[politicians_in_network["isInside"] == False]

    politicians_inside_json = df_to_json(politicians_inside)
    politicians_outside_json = df_to_json(politicians_outside)
    analysis["politicians_inside"] = politicians_inside_json
    analysis["politicians_outside"] = politicians_outside_json
    
    return analysis
    
    
# -*- coding: utf-8 -*-
"""
Created on Sun May 16 16:52:43 2021

@author: larsh
"""

from network import get_all_politicians_in_network
import pandas as pd
import math

def compute_centroid_top_k_percent(G_sorted_df, k):
    politicians_in_network = get_all_politicians_in_network(G_sorted_df)
    
    # specifies the percentage of the politicians in network taken
    percent = round((politicians_in_network.shape[0] / 100) * k)
    
    politicians_in_network = politicians_in_network.head(percent)
    
    # sum up x and y coordinates and scale them by in degree
    sum_x = 0
    sum_y = 0
    x = 0
    y = 0

    if not politicians_in_network.shape[0] == 0:
        for index, politician in politicians_in_network.iterrows():
            sum_x = sum_x + float(politician['x']) * int(politician['in_degree'])
            sum_y = sum_y + float(politician['y']) * int(politician['in_degree'])
            
        sum_score = pd.to_numeric(politicians_in_network['in_degree']).sum()
            
        x = sum_x / sum_score
        y = sum_y / sum_score
    
    return {"x": x, "y": y}

def compute_inside_outside_circle(G_sorted_df, twitterID, k, radius):
    
    politicians_in_network = get_all_politicians_in_network(G_sorted_df)
    
    # create isInside column
    politicians_in_network["isInside"] = False
    politicians_in_network["distance"] = 0
    
    centroid = compute_centroid_top_k_percent(G_sorted_df, k)
    centroid_x = centroid["x"]
    centroid_y = centroid["y"]
    for index, politician in politicians_in_network.iterrows():
        x = float(politician["x"])
        y = float(politician["y"])
        politicians_in_network.loc[index, "isInside"] = isInsideCircle(centroid_x, centroid_y, x, y, radius)
        politicians_in_network.loc[index, "distance"] = math.sqrt((centroid_x - x) ** 2 + (centroid_y - y) ** 2)
        
    # dont return the user itself, if its a politician
    return politicians_in_network[politicians_in_network["twitterId"] != twitterID]
        
        
def isInsideCircle(circle_x, circle_y, x, y, radius):
    dist = math.sqrt((circle_x - x) ** 2 + (circle_y - y) ** 2)
    return dist <= radius
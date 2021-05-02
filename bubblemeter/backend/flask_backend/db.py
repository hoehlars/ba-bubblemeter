# -*- coding: utf-8 -*-
"""
Created on Sun Apr 11 15:10:19 2021

@author: larsh, paulilb1
"""

import pymongo
from datetime import datetime
from dotenv import dotenv_values

config = dotenv_values(".env")

client = pymongo.MongoClient(config['DB_CONNECT_STRING'])
twitterNetworkDb = client[config['DB_NAME']]
edgeCol = twitterNetworkDb[config['EDGE_COL_NAME']]
politiciansCol = twitterNetworkDb[config['POLITICIANS_COL_NAME']]


def get_politicians():
    allEntries = politiciansCol.find({}, {"_id": 0, "username": 0})
    # get all politicans from db
    return list(allEntries)

def insert_edge(idFrom, idTo):
    datetime_now = datetime.now()
    edge = { "date": datetime_now, "IDFrom": idFrom, "IDTo": idTo}
    edgeCol.insert_one(edge)
    

def is_twitterId_in_db(twitterId):
    query = {"IDFrom": twitterId}
    allEntries = edgeCol.find(query)    
    return len(list(allEntries)) != 0

def get_friends(twitterID):
    query = {"IDFrom": twitterID}
    # project to IDTo
    allEntries = edgeCol.find(query, {"_id": 0, "date": 0})
    friends = []
    for entry in allEntries:
        friends.append(entry["IDTo"])
    return friends
    
def get_edges_friends(twitterID):
    query = {"IDFrom": twitterID}
    # project to IDTo
    allEntries = edgeCol.find(query, {"_id": 0, "date": 0})
    friends = []
    for entry in allEntries:
        friends.append(entry)
    return friends

def get_edges_friends_of_friends(twitterID):
    # get friends of specific user
    friends = get_edges_friends(twitterID)
    
    friends_of_friends = []
    
    # iterate over friends to get all friends of friends
    for friend in friends:
        friends_of_friend = get_edges_friends(friend["IDTo"])
        friends_of_friends.extend(friends_of_friend)
        
    # finally add also friends of specific user 
    friends_of_friends.extend(friends)
    
    return friends_of_friends
  

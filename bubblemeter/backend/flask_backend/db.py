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
analyzedCol = twitterNetworkDb[config['ANALYZED_USERS_NAME']]
requestQueueCol = twitterNetworkDb[config['QUEUE']]


def get_politicians():
    allEntries = politiciansCol.find({}, {"_id": 0, "username": 0})
    # get all politicans from db
    return list(allEntries)

def get_amount_of_politicians_in_db():
    allEntries = politiciansCol.find({}, {"_id": 0, "username": 0})
    return len(list(allEntries))

def insert_edge(idFrom, idTo):
    datetime_now = datetime.now()
    edge = { "date": datetime_now, "IDFrom": idFrom, "IDTo": idTo}
    edgeCol.insert_one(edge)
    
def insert_analyzed_user(twitterID, twitterHandle, twitterName, friends_count):
    datetime_now = datetime.now()
    edge = { "date": datetime_now, "twitterId": twitterID, "twitterHandle": twitterHandle, "twitterName": twitterName, "friends": friends_count}
    analyzedCol.insert_one(edge)
    
def get_analyzed_users():
    #returns all items in Collection
    allEntries = analyzedCol.find().sort("date",1)
    users = []
    for entry in allEntries:
        user = {"name": entry["twitterName"], "handle": entry["twitterHandle"], "id": entry["twitterId"]}
        users.append(user)
    return users

def is_twitterHandle_analyzed(twitterHandle):
    query = {"twitterHandle": twitterHandle}
    allEntries = analyzedCol.find(query)    
    return len(list(allEntries)) != 0

def is_twitterHandle_in_queue(twitterHandle):
    query = {"twitterHandle": twitterHandle}
    allEntries = requestQueueCol.find(query)    
    return len(list(allEntries)) != 0

def is_queue_empty():
    allEntries = requestQueueCol.find()
    count = len(list(allEntries))
    return count == 0
    
def insert_request_in_queue(twitterHandle):
    datetime_now = datetime.now()
    edge = { "date": datetime_now, "twitterHandle": twitterHandle}
    requestQueueCol.insert_one(edge) 

def get_next_request_from_queue():
    # 1 for oldest, -1 for newest
    nextUserDict = requestQueueCol.find().sort("date",1).limit(1)
    nextUser = nextUserDict[0]
    return nextUser['twitterHandle']

def remove_user_from_queue(twitterHandle):
    query = {"twitterHandle": twitterHandle}
    requestQueueCol.delete_one(query)

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
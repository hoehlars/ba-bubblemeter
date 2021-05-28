# -*- coding: utf-8 -*-
"""
Created on Sun Apr 11 15:10:19 2021

@author: larsh, paulilb1
"""

import pymongo
from datetime import datetime
import os

client = pymongo.MongoClient(os.environ['DB_CONNECT_STRING'])
twitterNetworkDb = client[os.environ['DB_NAME']]
edgeCol = twitterNetworkDb[os.environ['EDGE_COL_NAME']]
politiciansCol = twitterNetworkDb[os.environ['POLITICIANS_COL_NAME']]
analyzedCol = twitterNetworkDb[os.environ['ANALYZED_USERS_NAME']]
requestQueueCol = twitterNetworkDb[os.environ['QUEUE']]

#----- GENERAL -----

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

def insert_edge(idFrom, idTo):
    datetime_now = datetime.now()
    edge = { "date": datetime_now, "IDFrom": idFrom, "IDTo": idTo}
    edgeCol.insert_one(edge)

def delete_all_edges_from_db():
    edgeCol.remove({})

#----- POLITICIANS -----

def get_politicians():
    allEntries = politiciansCol.find({}, {"_id": 0, "username": 0})
    # get all politicans from db
    return list(allEntries)

def get_amount_of_politicians_in_db():
    allEntries = politiciansCol.find({}, {"_id": 0, "username": 0})
    return len(list(allEntries))
   
#-----ANALYZED USERS----- 
   
def insert_analyzed_user(twitterID, twitterHandle, twitterName, twitterProfileImage, friends_count, analysis):
    datetime_now = datetime.now()
    currentUser = {"date": datetime_now, "twitterName": twitterName, "twitterProfileImage": process_twitterProfileImage(twitterProfileImage), "friends": friends_count}
    analyzed_user = {"currentUser": currentUser, "analysis": analysis, "twitterId": twitterID, "twitterHandle": twitterHandle}
    analyzedCol.insert_one(analyzed_user)

def process_twitterProfileImage(twitterProfileImage):
    #_normal is has to be removed from the url string, _normal is the only version that can be retrieved with twitters user object
    betterTwitterProfileImage = twitterProfileImage.replace("_normal","")
    return betterTwitterProfileImage
    
def get_analyzed_users():
    #returns all items in Collection
    allEntries = analyzedCol.find().sort("date",1)
    users = []
    for entry in allEntries:
        user = {"name": entry["twitterName"], "handle": entry["twitterHandle"], "id": entry["twitterId"], "twitterProfileImage": entry["twitterProfileImage"]}
        users.append(user)
    return users
    

def is_twitterHandle_analyzed(twitterHandle):
    query = {"twitterHandle": twitterHandle}
    allEntries = analyzedCol.find(query)    
    return len(list(allEntries)) != 0

def get_analysis_of_user_analyzed(twitterID):
    query = {"twitterId"}
    allEntries = analyzedCol.find(query)
    return list(allEntries[0]["analysis"])

#-----REQUEST QUEUE-----

def insert_request_in_queue(twitterHandleOrTwitterID, email):
    datetime_now = datetime.now()
    edge = { "date": datetime_now, "twitterHandleOrTwitterID": twitterHandleOrTwitterID, "email": email}
    requestQueueCol.insert_one(edge) 
    
#returns the oldest request from the queue
def get_next_request_from_queue():
    # 1 for oldest, -1 for newest
    nextUserDict = requestQueueCol.find().sort("date",1).limit(1)
    nextUser = nextUserDict[0]
    return nextUser['twitterHandleOrTwitterID']

def get_email_from_twitterHandleOrTwitterID(twitterHandleOrTwitterID):
    query = {"twitterHandleOrTwitterID": twitterHandleOrTwitterID}
    user = requestQueueCol.find_one(query)
    return user['email']

def get_request_queue_length():
    #returns all items in Collection
    allEntries = requestQueueCol.find()
    return len(list(allEntries))

def remove_user_from_queue(twitterHandle):
    query = {"twitterHandleOrTwitterID": twitterHandle}
    requestQueueCol.delete_one(query)

def is_twitterHandle_in_queue(twitterHandle):
    query = {"twitterHandleOrTwitterID": twitterHandle}
    allEntries = requestQueueCol.find(query)    
    return len(list(allEntries)) != 0

def is_queue_empty():
    allEntries = requestQueueCol.find()
    count = len(list(allEntries))
    return count == 0
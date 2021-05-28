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


   
#-----ANALYZED USERS----- 
    
def get_analyzed_users():
    #returns all items in Collection
    allEntries = analyzedCol.find({}, {"_id": 0})
    users = []
    for entry in allEntries:
        user = {"currentUser": entry["currentUser"], "twitterId": entry["twitterId"], "twitterHandle": entry["twitterHandle"]}
        users.append(user)
    users.sort(key=lambda x: x["currentUser"]["date"])
    return users

def is_twitterHandle_analyzed(twitterHandle):
    query = {"twitterHandle": twitterHandle}
    allEntries = analyzedCol.find(query)    
    return len(list(allEntries)) != 0

def get_user_analyzed(twitterID):
    query = {"twitterId": int(twitterID)}
    allEntries = analyzedCol.find(query)    
    return list(allEntries)[0]

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
# -*- coding: utf-8 -*-
"""
Created on Sun Apr 11 15:10:19 2021

@author: larsh, paulilb1
"""

import pymongo
from datetime import datetime, timedelta

client = pymongo.MongoClient("")
twitterNetworkDb = client["twitterNetworkDb"]
edgeCol = twitterNetworkDb["twitterEdges"]
politiciansCol = twitterNetworkDb["Politiker"]

def get_politicians():
    allEntries = politiciansCol.find({}, {"_id": 0, "username": 0})
    # get NR and SR from db
    return list(allEntries)

def insert_edge(idFrom, idTo):
    datetime_now = datetime.now()
    edge = { "date": datetime_now, "IDFrom": idFrom, "IDTo": idTo}
    edgeCol.insert_one(edge)
    

def is_twitterId_in_db(twitterId):
    query = {"IDFrom": twitterId}
    allEntries = edgeCol.find(query)    
    return len(list(allEntries)) != 0

def count_amount_of_friends_in_db(twitterID):
    query = {"IDFrom": twitterID}
    allEntries = edgeCol.find(query)
    return len(list(allEntries))

def get_date_of_entries(twitterID):
    query = {"IDFrom": twitterID}
    allEntriesList = list(edgeCol.find(query))
    if len(allEntriesList) == 0:
        return None
    else:
        return allEntriesList[0]["date"]
    
def delete_all_entries(twitterID):
    query = {"IDFrom": twitterID}
    edgeCol.delete_many(query)
    
    
def delete_all_entries_before_certain_date(day, month, year):
    d = datetime(year, month, day)
    query = {"date": {"$lt": d}}
    edgeCol.delete_many(query)
    
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

def delete_all_entries_older_than_10_days():
    date_10_days_before = datetime.now() - timedelta(days = 10)
    day = date_10_days_before.day
    month = date_10_days_before.month
    year = date_10_days_before.year
    delete_all_entries_before_certain_date(day, month, year, edgeCol)
  

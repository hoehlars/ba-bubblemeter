# -*- coding: utf-8 -*-
"""
Created on Sun Apr 11 15:10:19 2021

@author: larsh
"""

import pymongo
from datetime import datetime

client = pymongo.MongoClient("mongodb://localhost:27017/")

twitterNetworkDb = client["twitterNetworkDb"]

edgeCol = twitterNetworkDb["twitterEdges"]


def insert_edge( idFrom, idTo, edgeCol):
    datetime_now = datetime.now()
    edge = { "date": datetime_now, "IDFrom": idFrom, "IDTo": idTo}
    edgeCol.insert_one(edge)
    

def is_twitterId_in_db(twitterId, edgeCol):
    query = {"IDFrom": twitterId}
    allEntries = edgeCol.find(query)    
    return len(list(allEntries)) != 0

def count_amount_of_friends_in_db(twitterID, edgeCol):
    query = {"IDFrom": twitterID}
    allEntries = edgeCol.find(query)
    return len(list(allEntries))

def get_date_of_entries(twitterID, edgeCol):
    query = {"IDFrom": twitterID}
    allEntriesList = list(edgeCol.find(query))
    if len(allEntriesList) == 0:
        return None
    else:
        return allEntriesList[0]["date"]
    
def delete_all_entries(twitterID, edgeCol):
    query = {"IDFrom": twitterID}
    edgeCol.delete_many(query)
    
    
def delete_all_entries_before_certain_date(day, month, year, edgeCol):
    d = datetime(year, month, day)
    query = {"date": {"$lt": d}}
    edgeCol.delete_many(query)
    
def get_all_friends(twitterID, edgeCol):
    query = {"IDFrom": twitterID}
    
    # project to IDTo
    allEntries = edgeCol.find(query, {"IDTo": 1, "_id": 0})
    id_list = []
    for entry in allEntries:
        id_list.append(entry["IDTo"])
    
    return id_list
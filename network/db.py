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




def insert_edge(twitterHandleFrom, idFrom, twitterHandleTo, idTo, edgeCol):
    datetime_now = datetime.now()
    edge = { "date": datetime_now, "twitterHandleFrom": twitterHandleFrom, "IDFrom": idFrom, "twitterHandleTo": twitterHandleTo, "IDTo": idTo}
    edgeCol.insert_one(edge)
    

def is_twitterId_in_db(twitterId, edgeCol):
    query = {"$or":[ {"IDFrom": twitterId}, {"IDTo": twitterId}]}
    allEntries = edgeCol.find(query)
    return len(list(allEntries)) == 0

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
    

insert_edge("@Ilbien", "1234", "Lars", "12345", edgeCol)
print(is_twitterId_in_db("123456", edgeCol))
print(count_amount_of_friends_in_db("123456", edgeCol))
print(get_date_of_entries("1234", edgeCol))


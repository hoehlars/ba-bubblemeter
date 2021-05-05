# -*- coding: utf-8 -*-
"""
Created on Sun Apr 11 15:10:19 2021

@author: larsh
"""

import pymongo
import tweepy
import pandas as pd

client = pymongo.MongoClient("")

twitterNetworkDb = client[""]

pol = twitterNetworkDb[""]

consumer_key = ''
consumer_secret = ''
access_token = ''
access_token_secret = ''

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)

def insert_nr(smartMapId, firstname, lastname, twitterHandle, twitterId, yearOfBirth, profileImageUrl, isIncumbent, isElected, partyAbbreviation, partyColor, __typename, twitterLink, coordinates):
    NR_SR = {"smartMapId": smartMapId, "firstname": firstname, "lastname": lastname, "twitterHandle": twitterHandle, "twitterId": twitterId, "yearOfBirth": yearOfBirth, "profileImageUrl": profileImageUrl, "isIncumbent": isIncumbent, "isElected": isElected, "partyAbbreviation": partyAbbreviation, "partyColor": partyColor, "__typename": __typename, "twitterLink": twitterLink, "x": coordinates['x'], "y": coordinates['y']}  
    pol.insert_one(NR_SR)
    print('Inserted: ', firstname, lastname)
    
data = pd.read_json (r'candidates.json')
df= pd.DataFrame(data, columns=["smartMapId", "firstname", "lastname", "yearOfBirth", "profileImageUrl", "isIncumbent", "isElected", "partyAbbreviation", "partyColor", "__typename", "twitterLink", "coordinates"])


def get_twitter_handle(twitterLink):
    splitted = twitterLink.split("/")
    if len(splitted) == 4:
        return splitted[3]
    else: return ''


i = 0
for index, row in df.iterrows():
    twitter_handle = get_twitter_handle(row['twitterLink'])
    
    
    # check if not in db
    entry = pol.find({"twitterHandle": twitter_handle})
    
    if len(list(entry)) == 0:
    
        # from link --> has query parameter
        if twitter_handle.find('?') != -1:
            splitted = twitter_handle.split('?')
            twitter_handle = splitted[0]
            print(twitter_handle)
            
        
        try:
            user =  api.get_user(screen_name = twitter_handle)
            i = i + 1
            insert_nr(row['smartMapId'], row['firstname'], row['lastname'], twitter_handle, user.id, row['yearOfBirth'], row['profileImageUrl'], row['isIncumbent'], row['isElected'], row['partyAbbreviation'], row['partyColor'], row['__typename'], row['twitterLink'], row['coordinates'])
        except:
            print('error', twitter_handle)
        
    
print(i)

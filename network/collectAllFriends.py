# -*- coding: utf-8 -*-
"""
Created on Tue Apr  6 12:23:01 2021

@author: larsh
"""

import tweepy
import pymongo
import pandas as pd
from db import is_twitterId_in_db
from db import insert_edge

# relevant DB variables
client = pymongo.MongoClient("mongodb://localhost:27017/")
twitterNetworkDb = client["twitterNetworkDb"]
edgeCol = twitterNetworkDb["twitterEdges"]

consumer_key = ''
consumer_secret = ''
access_token = ''
access_token_secret = ''

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)

# start with this user
userStart = api.get_user(screen_name = 'elbueno_paulo')
user_Id = [userStart.id]

# get all friends of the userStart
friends_list = []
friends = []
if not is_twitterId_in_db(user_Id, edgeCol):
    # TODO get all friends of this id from DB
    # friends_list = ...
    print("User is in DB!")
else:
    try:
        for page in tweepy.Cursor(api.friends_ids, user_id=user_Id).pages():
            friends.extend(page)
            for friend_id in page:
                friend = api.get_user(user_id = friend_id)
                insert_edge(userStart.screen_name, user_Id, friend.screen_name, friend.id, edgeCol)
        friends_list.append(friends)
    except tweepy.TweepError:
        print("error")

#check if friends_count is different or if friend is older than 10 days in DB need to be updated

df = pd.DataFrame(columns=['source','target'])

# Set the list of friends as the target column
df['target'] = friends_list[0] 

# Set my user ID as the source 
df['source'] = userStart.id 

friends_list = list(df['target'])
# friendCount and totalFriends are only important for the prints
friendCount = 0
totalFriends = userStart.friends_count

# Iterate over all the friends and get their friends
for userID in friends_list:
    friendCount = friendCount + 1
    print('Friend {:d} of {:d}'.format(friendCount, totalFriends))
    
    friends = []
    friends_list = []

    # TODO check if userID is in db

    # fetching the user
    user = api.get_user(userID)

    # fetching the friends_count
    friends_count = user.friends_count

    try:
        for page in tweepy.Cursor(api.friends_ids, user_id=userID).pages():
            friends.extend(page)
            
            # TODO add to database
            
            if friends_count >= 5000: #Only take first 5000 friends
                break
    except tweepy.TweepError:
        print("error")
        continue
    friends_list.append(friends)
    temp = pd.DataFrame(columns=['source', 'target'])
    temp['target'] = friends_list[0]
    temp['source'] = userID
    df = df.append(temp)
    df.to_csv("networkOfFollowers.csv")
    
    

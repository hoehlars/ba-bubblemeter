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
from db import get_all_friends

# relevant DB variables
client = pymongo.MongoClient("mongodb://localhost:27017/")
twitterNetworkDb = client["twitterNetworkDb"]
edgeCol = twitterNetworkDb["twitterEdges"]

consumer_key = 'Z1QD8RltemV1mcCLqRlCsQRgx'
consumer_secret = 'xk3xWh1QoOei6rUZnpRV0V1m58P5p0zMkpaEmAn3BoQ7UDuyJy'
access_token = '1367397576836845579-4rMj1q9XXLJDJTXpdrfJVdMUEGVSKO'
access_token_secret = 'pWqLEJf1THgqkKTTQiHjYl2A7AqPhV6TUg2IJBjkQkBd0'

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)

# start with this user
userStart = api.get_user(screen_name = 'ThomasPercy95')

# get all friends of the userStart
friends_list = []
friends = []
if is_twitterId_in_db(userStart.id, edgeCol):
    print("User is in DB!")
    friends_list.append(get_all_friends(userStart.id, edgeCol))
else:
    print("User is not in DB!")
    try:
        for page in tweepy.Cursor(api.friends_ids, user_id=userStart.id).pages():
            friends.extend(page)
        for friend_id in friends:
            friend = api.get_user(user_id = friend_id)
            insert_edge(userStart.id, friend.id, edgeCol)
        friends_list.append(friends)
    except tweepy.TweepError:
        print("error")

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
    
    if is_twitterId_in_db(userID, edgeCol):
        friends = []
        # fetching the user
        user = api.get_user(userID)
        # defining the friends_count
        friends_count = user.friends_count
        try:
            for page in tweepy.Cursor(api.friends_ids, user_id=userID).pages():
                friends.extend(page)          
                if friends_count >= 5000: #Only take first 5000 friends
                    break
                for friend_id in friends:
                    insert_edge(user.id, friend.id, edgeCol)
        except tweepy.TweepError:
            print("error")
            continue
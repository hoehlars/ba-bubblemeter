# -*- coding: utf-8 -*-
"""
Created on Tue Apr  6 12:23:01 2021

@author: larsh
"""

import tweepy
import pandas as pd

consumer_key = ''
consumer_secret = ''
access_token = ''
access_token_secret = ''

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)

# start with this user
userStart = api.get_user(screen_name = 'elbueno_paulo')
user_list = [userStart.id]


# get all friends of the userStart
firends_list = []
for user in user_list:
    friends = []
    try:
        for page in tweepy.Cursor(api.friends_ids, user_id=user).pages():
            friends.extend(page)
            
            
            # TODO: add to database
            
    except tweepy.TweepError:
        print("error")
        continue
    firends_list.append(friends)

#split into two lists friends and friends in DB

#check if friends_count is diefferent or if friend is older than 10 days in DB need to be updated

df = pd.DataFrame(columns=['source','target'])

# Set the list of friends as the target column
df['target'] = firends_list[0] 

# Set my user ID as the source 
df['source'] = userStart.id 


firends_list = list(df['target'])
friendCount = 0
totalFollowers = userStart.friends_count

# Iterate over all the friends and get their friends
for userID in firends_list:
    friendCount = friendCount + 1
    print('Follower {:d} of {:d}'.format(friendCount, totalFollowers))
    
    friends = []
    firends_list = []

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
    firends_list.append(friends)
    temp = pd.DataFrame(columns=['source', 'target'])
    temp['target'] = firends_list[0]
    temp['source'] = userID
    df = df.append(temp)
    df.to_csv("networkOfFollowers.csv")
    
    

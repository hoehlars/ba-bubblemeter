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
userStart = api.get_user(screen_name = '')
user_list = [userStart.id]


# get all followers of the userStart
follower_list = []
for user in user_list:
    followers = []
    try:
        for page in tweepy.Cursor(api.followers_ids, user_id=user).pages():
            followers.extend(page)
            
            
            # TODO: add to database
            
    except tweepy.TweepError:
        print("error")
        continue
    follower_list.append(followers)
    
df = pd.DataFrame(columns=['source','target'])

# Set the list of followers as the target column
df['target'] = follower_list[0] 

# Set my user ID as the source 
df['source'] = userStart.id 


follower_list = list(df['target'])
followerCount = 0
totalFollowers = userStart.followers_count

# Iterate over all the followers and get their followers
for userID in follower_list:
    followerCount = followerCount + 1
    print('Follower {:d} of {:d}'.format(followerCount, totalFollowers))
    
    followers = []
    follower_list = []

    # fetching the user
    user = api.get_user(userID)

    # fetching the followers_count
    followers_count = user.followers_count

    try:
        for page in tweepy.Cursor(api.followers_ids, user_id=userID).pages():
            followers.extend(page)
            
            # TODO add to database
            
            if followers_count >= 5000: #Only take first 5000 followers
                break
    except tweepy.TweepError:
        print("error")
        continue
    follower_list.append(followers)
    temp = pd.DataFrame(columns=['source', 'target'])
    temp['target'] = follower_list[0]
    temp['source'] = userID
    df = df.append(temp)
    df.to_csv("networkOfFollowers.csv")
    
    

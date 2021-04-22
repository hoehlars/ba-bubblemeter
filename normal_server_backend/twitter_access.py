# -*- coding: utf-8 -*-
"""
Created on Tue Apr  6 12:23:01 2021

@author: larsh, paulilb1
"""

import tweepy
from db import is_twitterId_in_db
from db import insert_edge
from db import get_friends
from dotenv import dotenv_values

consumer_key = config['CONSUMER_KEY']
consumer_secret = config['CONSUMER_SECRET']
access_token = config['ACCESS_TOKEN']
access_token_secret = config['ACCESS_TOKEN_SECRET']

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)

# pass user to start with as string
# it willl automatically call process_friends_of_friends
def process_friends(user_to_start_with):
    userStart = api.get_user(user_id = str(user_to_start_with))
    if is_twitterId_in_db(userStart.id):
        print("User is in DB!")
        process_friends_of_friends(userStart, get_friends(userStart.id))
    else:
        print("User is not in DB!")
        friends = []
        try:
            for page in tweepy.Cursor(api.friends_ids, user_id=userStart.id).pages():
                friends.extend(page)
            for friend_id in friends:
                insert_edge(userStart.id, friend_id)
            process_friends_of_friends(userStart, friends)
        except tweepy.TweepError:
            print("error")
        
def process_friends_of_friends(user, friends):
    # friendCount and friend_of_friend_count are only important for the prints
    friendCount = 0
    for friend_id in friends:
        friend_of_friend_count = 0
        friendCount = friendCount + 1
        print('Friend {:d} of {:d}'.format(friendCount, user.friends_count))
        if not is_twitterId_in_db(friend_id):
            friends_of_friends = []
            print(friend_id)
            friend_object = api.get_user(user_id = str(friend_id))
            try:
                for page in tweepy.Cursor(api.friends_ids, user_id=friend_id).pages():
                    friends_of_friends.extend(page)
                    if friend_object.friends_count >= 5000:
                        break
                for friend_of_friend_id in friends_of_friends:
                    friend_of_friend_count = friend_of_friend_count + 1
                    print('     Friend of Friend {:d} of {:d}'.format(friend_of_friend_count, friend_object.friends_count))
                    insert_edge(friend_id, friend_of_friend_id)
            except tweepy.TweepError:
                print("error")
                continue

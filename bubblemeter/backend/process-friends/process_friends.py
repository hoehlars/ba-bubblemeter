# -*- coding: utf-8 -*-
"""
Created on Tue Apr  6 12:23:01 2021

@author: larsh, paulilb1
"""

import tweepy
import time
from db import is_twitterId_in_db
from db import insert_edge
from db import get_friends
from db import insert_analyzed_user
from db import delete_all_edges_from_db
from make_analysis import make_analysis
from db import get_email_from_twitterHandleOrTwitterID
from email_notification import send_notification
import os

key_in_use = 1

consumer_key = os.environ['CONSUMER_KEY_1']
consumer_secret = os.environ['CONSUMER_SECRET_1']
access_token = os.environ['ACCESS_TOKEN_1']
access_token_secret = os.environ['ACCESS_TOKEN_SECRET_1']

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)

#uses global variable key_in_use to determin which key is in use and which should be used next
#in case all keys are used up it goes back to the first and waits for 15 minutes
def change_keys():
    global key_in_use
    global auth
    global api
    
    print("--> key change")
    
    case = key_in_use
    
    if case == 1 or case == 2:
        key_in_use = key_in_use + 1
        print("KEY: ", key_in_use)
        consumer_key = os.environ['CONSUMER_KEY_' + str(key_in_use)]
        consumer_secret = os.environ['CONSUMER_SECRET_' + str(key_in_use)]
        access_token = os.environ['ACCESS_TOKEN_' + str(key_in_use)]
        access_token_secret = os.environ['ACCESS_TOKEN_SECRET_' + str(key_in_use)]
        
        
        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        api = tweepy.API(auth, wait_on_rate_limit=False, wait_on_rate_limit_notify=False, compression=True)
        
    if case == 3:
        key_in_use = 1
        print("KEY: ", key_in_use)
        print("Rate limit reached. Sleeping for 15 minutes")
        time.sleep(900) #15 minutes
        consumer_key = os.environ['CONSUMER_KEY_1']
        consumer_secret = os.environ['CONSUMER_SECRET_1']
        access_token = os.environ['ACCESS_TOKEN_1']
        access_token_secret = os.environ['ACCESS_TOKEN_SECRET_1']
        
        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        api = tweepy.API(auth, wait_on_rate_limit=False, wait_on_rate_limit_notify=False, compression=True)
        
        key_in_use = 1
        

# pass user to start with as string
# it willl automatically call process_friends_of_friends
def process_friends(user_to_start_with):

    print("In progress...")
    print("Collect or load friends...")
    
    if str(user_to_start_with).isdecimal():
        try:
            userStart = api.get_user(user_id = str(user_to_start_with))
        except:
            print("USER ID " + user_to_start_with + " DOES NOT EXIST")
            return
    else:
        try:
            userStart = api.get_user(screen_name = str(user_to_start_with))
        except:
            print("USER HANDLE " + user_to_start_with + " DOES NOT EXIST")
            return
    
    if not userStart.protected and userStart.friends_count > 0:
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
                    print("Insert: ", friend_id, " into DB!")
                    insert_edge(userStart.id, friend_id)
                process_friends_of_friends(userStart, friends)
            except tweepy.TweepError:
                print("error")
    else:
        print("User is either private or has no friends!")
            
def process_friends_of_friends(user, friends):

    print("Check friends of friends or add to DB...")
    
    global api
    api = tweepy.API(auth, wait_on_rate_limit=False, wait_on_rate_limit_notify=False, compression=True)
    friend_position = 0
    while friend_position < len(friends):
        print("Friend ", friend_position + 1, " of ", len(friends))
        if not is_twitterId_in_db(friends[friend_position]):
            try:
                friend_object = api.get_user(user_id = str(friends[friend_position]))
                if not friend_object.protected and friend_object.friends_count > 0:
                    friends_of_friends = []
                    for page in tweepy.Cursor(api.friends_ids, user_id=friends[friend_position]).pages():
                        friends_of_friends.extend(page)
                        if friend_object.friends_count >= 5000:
                            break
                    for friend_of_friend_id in friends_of_friends:
                        insert_edge(friends[friend_position], friend_of_friend_id) 
            except tweepy.TweepError:
                print("error or key change")
                change_keys()
                continue
        friend_position = friend_position + 1
    
    # finished process friends --> make analyis
    analysis = make_analysis(user.id)
    insert_analyzed_user(user.id, user.screen_name, user.name, user.profile_image_url_https, user.friends_count, analysis)

    # delete all edges from db
    delete_all_edges_from_db()

    # send email
    send_notification(get_email_from_twitterHandleOrTwitterID(user.screen_name))

    print("finished")
            

import os
import tweepy

consumer_key = os.environ['CONSUMER_KEY_1']
consumer_secret = os.environ['CONSUMER_SECRET_1']
access_token = os.environ['ACCESS_TOKEN_1']
access_token_secret = os.environ['ACCESS_TOKEN_SECRET_1']

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)


def get_user_from_id(twitter_id):
    return api.get_user(user_id = twitter_id)
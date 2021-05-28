# -*- coding: utf-8 -*-
"""
Created on Sat May 8 22:33:02 2021

@author: ilbie
"""

import time
from process_friends import process_friends
from db import is_queue_empty
from db import get_next_request_from_queue
from db import remove_user_from_queue
import schedule

in_progress = False

def analyze_user(twitterHandle):
    global in_progress 
    in_progress = True
    process_friends(twitterHandle)
    in_progress = False

def process_queue():
    global in_progress
    if not in_progress and not is_queue_empty():
        print("started")
        nextUserTwitterHandle = get_next_request_from_queue()
        print("Processing next: " + nextUserTwitterHandle)
        analyze_user(nextUserTwitterHandle)
        remove_user_from_queue(nextUserTwitterHandle)
    else:
        print("queue empty or in progress.....")
    

schedule.every().minute.at(":15").do(process_queue)

while 1:
    schedule.run_pending()
    time.sleep(1)

        
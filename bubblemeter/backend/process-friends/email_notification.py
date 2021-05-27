# -*- coding: utf-8 -*-
"""
Created on Sun May 23 23:27:26 2021

@author: ilbie
"""

import yagmail
from dotenv import dotenv_values

config = dotenv_values(".env")

email = config['EMAIL']
email_pw = config['EMAIL_PW']

yag = yagmail.SMTP(email, email_pw)

subject = 'Bubblemeter results'
body = 'Your bubblemeter analysis is finished and ready to be viewed!'
html = '<a href="www.google.com">Click me!</a>'

def send_notification(receiver):
    to = receiver
    yag.send(to = to, subject = subject, contents = [body, html])
# -*- coding: utf-8 -*-
"""
Created on Sun May 23 23:27:26 2021

@author: ilbie
"""

import yagmail
import os

email = os.environ['EMAIL']
email_pw = os.environ['EMAIL_PW']

yag = yagmail.SMTP(email, email_pw)





def send_notification(receiver, screen_name, twitterID):
    subject = 'Bubblemeter results for {}'.format(screen_name)
    frontend_url = 'https://bubblemeter-ba.vercel.app/results/{}'.format(twitterID)
    html = '<h3>Hallo {}</h3><p>Dein Auftrag wurde abgearbeitet und du kannst das analysierte Profil von USERNAME hier einsehen:</p><a href="{}">Hier findest du deine Resultate!</a><p>Vielen Dank dafür, dass du mit uns gebubbelt hast!</p>'.format(screen_name, frontend_url)
    to = receiver
    yag.send(to = to, subject = subject, contents = html)
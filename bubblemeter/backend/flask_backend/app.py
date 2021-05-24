# -*- coding: utf-8 -*-
"""
Created on Sat Apr 17 19:00:55 2021

Connect: localhost:5000/

@author: larsh, paulilb1
"""

#flask import
import flask
from flask_cors import CORS
from gevent.pywsgi import WSGIServer
app = flask.Flask(__name__)

CORS(app)

#imports
from flask_swagger_ui import get_swaggerui_blueprint

from db import get_analysis_of_user_analyzed


SWAGGER_URL = '/docs'

swagger_ui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    '/static/hoehlars-bubblemeterbackend-1.0.0-resolved.json',
    config={
        'app_name': "Bubblemeter Backend"
    }
)

app.register_blueprint(swagger_ui_blueprint, url_prefix=SWAGGER_URL)

@app.route('/get_analysis/<twitterID>')
def get_analysis(twitterID):
    analysis = get_analysis_of_user_analyzed(twitterID)
    response = {"statusCode": 200, "body": {"analysis": analysis}}
    return response


if __name__ == "__main__":
    http_server = WSGIServer(('', 5000), app)
    http_server.serve_forever()
import json
import os


def collect_all_friends(event, context):

    access_token = os.environ['CONSUMER_KEY']

    body = {
        "message": "Go Serverless v2.0! Your function executed successfully!",
        "input": event,
        "access_token": access_token
    }


    response = {"statusCode": 200, "body": json.dumps(body)}

    return response

    # Use this code if you don't use the http event with the LAMBDA-PROXY
    # integration
    """
    return {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "event": event
    }
    """

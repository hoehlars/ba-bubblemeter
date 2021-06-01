from datetime import datetime, timedelta
import logging
import os

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# connect to db
db_connect_string = os.environ['DB_STRING']
db_name = os.environ['DB_NAME']
db_col = os.environ['DB_COL']

client = pymongo.MongoClient(db_connect_string)
twitterNetworkDb = client[db_name]
edgeCol = twitterNetworkDb[db_col]

def delete_old_entries(event, context):
    current_time = datetime.now()
    date_10_days_before = current_time - timedelta(days = 10)
    day = date_10_days_before.day
    month = date_10_days_before.month
    year = date_10_days_before.year
    delete_all_entries_before_certain_date(day, month, year, edgeCol)

def delete_all_entries_before_certain_date(day, month, year, edgeCol):
    d = datetime(year, month, day)
    query = {"date": {"$lt": d}}
    edgeCol.delete_many(query)

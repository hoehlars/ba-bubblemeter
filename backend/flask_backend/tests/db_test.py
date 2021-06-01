
import sys
sys.path.append("..")

import unittest
from datetime import datetime
import pymongo
from db import *
from dotenv import dotenv_values



class TestDB(unittest.TestCase):
    
    edgeCol = None
    politicianCol = None
        
        
    def setUp(self):
        # setup db
        client = pymongo.MongoClient('mongodb://localhost:27017/')
        twitterNetworkDb = client['twitterNetworkDb']
        self.edgeCol = twitterNetworkDb['twitterEdges']
        self.politicianCol = twitterNetworkDb['Politiker_new_format']
                                          
        # insert three edges
        datetime_now = datetime.now()
        edge1 = { "date": datetime_now, "IDFrom": '1', "IDTo": '2'}
        edge2 = { "date": datetime_now, "IDFrom": '2', "IDTo": '3'}
        edge3 = { "date": datetime_now, "IDFrom": '6', "IDTo": '7'}
        self.edgeCol.insert_one(edge1)
        self.edgeCol.insert_one(edge2)
        self.edgeCol.insert_one(edge3)
        
        # insert two politicians
        politician1 = { "vorname": "Addor", "name": "Jean-Luc", "partei": "SVP", "kanton": "Wallis", "id": "256863130", "handle": "udcvr64", "username": "Jean-Luc Addor", "x": 191897168839138, "y": 285013420837843}
        
        politician2 = { "vorname": "Aebischer", "name": "Matthias", "partei": "SP", "kanton": "Bern", "id": "280789941", "handle": "M_Aebischer", "username": "Matthias Aebischer", "x": 308010792866639, "y": 153645842311738}
        
        self.politicianCol.insert_one(politician1)
        self.politicianCol.insert_one(politician2)
        
    def tearDown(self):
        # drop collections
        self.edgeCol.drop()
        self.politicianCol.drop()
                                     

    def test_get_politicians(self):
        allEntries = get_politicians()
        size = len(allEntries)
        self.assertEqual(size, 2, "should be 2")

    def test_get_amount_of_politicians_in_db(self):
        size = get_amount_of_politicians_in_db()
        self.assertEqual(size, 2, "Should be 2")
        
    def test_insert_edge(self):
        size_before = len(list(self.edgeCol.find({})))
        self.assertEqual(size_before, 3, "should be 2")
        
        insert_edge('3', '4')

        size_after = len(list(self.edgeCol.find({})))
        edge = self.edgeCol.find({"IDFrom": '3'})
        
        self.assertEqual(size_after, 4)
        self.assertTrue(edge)
        
    def test_is_twitter_id_in_db(self):
        in_db = is_twitterId_in_db('1')
        self.assertEqual(in_db, True)
        
        in_db = is_twitterId_in_db('5')
        self.assertEqual(in_db, False)
        
    def test_get_friends(self):
        allEntries = get_friends('1')
        
        # friends has id 2
        friends = []
        for entry in allEntries:
            friends.append(entry)
        
            
        self.assertEqual(friends[0], "2")
        self.assertEqual(len(list(allEntries)), 1)
        
    def test_get_edges_friends(self):
        allEntries = get_edges_friends('1')
        
        # friends has id 2
        friends = []
        for entry in allEntries:
            friends.append(entry)
        
            
        self.assertEqual(friends[0]["IDTo"], "2")
        self.assertEqual(len(list(allEntries)), 1)
        
    def test_get_edges_friends_of_friends(self):
        allEntries = get_edges_friends_of_friends('1')
        
        # friends has id 2
        friends = []
        for entry in allEntries:
            friends.append(entry)
        
            
        self.assertEqual(friends[1]["IDTo"], "2")
        self.assertEqual(friends[0]["IDTo"], "3")
        self.assertEqual(len(list(allEntries)), 2 )
        

if __name__ == '__main__':
    unittest.main()
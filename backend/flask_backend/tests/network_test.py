# -*- coding: utf-8 -*-
"""
Created on Tue May 11 11:33:39 2021

@author: larsh
"""


import sys
sys.path.append("..")

import unittest
from datetime import datetime
import pymongo
from network import *
from dotenv import dotenv_values
from db import get_edges_friends_of_friends, insert_edge



class TestNetwork(unittest.TestCase):
    
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
        politician1 = { "smartMapId": "1234", 
                       "firstname": "test", 
                       "lastname": "testname", 
                       "twitterHandle": "testhandle", 
                       "twitterId": "65",
                       "yearOfBirth": "1965", 
                       "profileImageUrl": "example.com",
                       "isIncumbent": "true",
                       "isElected": "false",
                       "partyAbbreviation": "SVP",
                       "partyColor": "DD0E0E",
                       "__typename": "Candidate",
                       "twitterLink": "www.example.com",
                       "x": 12,
                       "y": 15}
        
        politician2 = { "smartMapId": "12345", 
                       "firstname": "test2", 
                       "lastname": "testname2", 
                       "twitterHandle": "testhandle2", 
                       "twitterId": "66",
                       "yearOfBirth": "1965", 
                       "profileImageUrl": "example.com",
                       "isIncumbent": "true",
                       "isElected": "false",
                       "partyAbbreviation": "SVP",
                       "partyColor": "DD0E0E",
                       "__typename": "Candidate",
                       "twitterLink": "www.example.com",
                       "x": 12,
                       "y": 15}
        
        
        
        self.politicianCol.insert_one(politician1)
        self.politicianCol.insert_one(politician2)
        
    def tearDown(self):
        # drop collections
        self.edgeCol.drop()
        self.politicianCol.drop()
        
    def test_generate_graph(self):
        
        allEntries = get_edges_friends_of_friends('1')
        edges = []
        for entry in allEntries:
            edges.append(entry)
        
        # 2 edges in db
        self.assertEqual(len(edges), 2)
        
        edges_df = pd.DataFrame(edges)
        G_sorted_df = generate_graph(edges_df)
        
        # should have 3 rows and 2 columns
        self.assertEqual(len(G_sorted_df), 3)
        self.assertEqual(len(G_sorted_df.columns), 2)
        self.assertListEqual(list(G_sorted_df.columns), ['twitter_id', 'in_degree'])
        
        # id 1 should have in degree 0, 2 should have 1 and 3 also 1
        self.assertEqual(G_sorted_df.iloc[0]['in_degree'], 1)
        self.assertEqual(G_sorted_df.iloc[1]['in_degree'], 1)
        self.assertEqual(G_sorted_df.iloc[2]['in_degree'], 0)
        
        id_list = G_sorted_df['twitter_id'].tolist()
        
        self.assertListEqual(sorted(id_list), ['1','2','3'])
        
        
    def test_get_all_NR_and_SR_in_network(self):
        
        # add new edges with politicians in it
        insert_edge("65", "66")
        
       
        #setup
        allEntries = get_edges_friends_of_friends('65')
        edges = []
        for entry in allEntries:
            edges.append(entry)
        
        # 2 edges in db
        self.assertEqual(len(edges), 1)
        
        edges_df = pd.DataFrame(edges)
        G_sorted_df = generate_graph(edges_df)
        self.assertEqual(len(G_sorted_df), 2)
        self.assertListEqual(list(G_sorted_df.columns), ['twitter_id', 'in_degree'])
        
        politicians_df = get_all_NR_and_SR_in_network(G_sorted_df)
        
        # two politicians in network, 16 columns
        self.assertEqual(len(politicians_df), 2)
        self.assertEqual(len(politicians_df.columns), 16)
        self.assertListEqual(list(politicians_df.columns), ["smartMapId", "firstname", "lastname","twitterHandle", "twitterId", "yearOfBirth", "profileImageUrl", "isIncumbent", "isElected", "partyAbbreviation", "partyColor", "__typename", "twitterLink", "x", "y", "in_degree"])
        
        

if __name__ == '__main__':
    unittest.main()
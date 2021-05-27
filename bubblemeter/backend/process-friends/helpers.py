# -*- coding: utf-8 -*-
"""
Created on Sun May 16 16:40:22 2021

@author: larsh
"""

import json

def df_to_json(df):
    result = df.to_json(orient="split")
    return json.loads(result)
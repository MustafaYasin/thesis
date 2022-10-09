from unicodedata import name
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Table,Column,Integer,String
import glob
import os
from sqlalchemy import MetaData
from sqlalchemy.orm import mapper
import sqlite3
import pandas as ps
import psycopg2




with open('/Users/myasin/Documents/thesis/app/backend/pytorch_pytorch.csv', 'r') as f:    
    conn = create_engine('postgresql+psycopg2://...').raw_connection()
    cursor = conn.cursor()
    cmd = 'COPY pytorch_pytorch(username, name, email, repo_count, company, avatar_url, hireable, star_time) FROM STDIN WITH (FORMAT CSV, HEADER FALSE)'
    cursor.copy_expert(cmd, f)
    conn.commit()
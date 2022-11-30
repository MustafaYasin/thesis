import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import numpy as np
import csv
from utils import retrieve_fields
import json
from pprint import pprint

df = pd.read_csv('../user_data_csv/csv_readme_per_user.csv')
print (df.head(1))








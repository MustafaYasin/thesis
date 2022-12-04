import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import numpy as np
import sys
import os
import re
from collections import Counter
from pprint import pprint
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from collections import Counter
from num2words import num2words

import nltk
import os
import string
import copy
import pickle
import re
import math


# Download the stopwords
nltk.download('stopwords')

# Import the csv file with all downloaded READMES
df = pd.read_csv("../user_data_csv/csv_readme_per_user.csv")

# Apply different methods to clean the text e.g. remove appestorph and unnessary signs
def clean_df(df):
    symbols = "!\"#$%&()*+-./:;<=>?@[\]^_`{|}~\n"
    df['READMES'] = df['READMES'].str.replace('[^a-zA-Z0-9]', ' ', regex=True).str.strip()
    df["READMES"] = df["READMES"].apply(str)
    df["READMES"] = df["READMES"].str.replace(r"[\"\',]", '')
    df["READMES"] = df["READMES"].apply(lambda x: ''.join(ch for ch in x if ch not in set(symbols)))
    df['READMES'] = df['READMES'].str.replace('\d+', '') 
    df['READMES'] = df['READMES'].str.lower()
    df = df.dropna(how='all')
    df.to_csv("cleaned_df.csv", index=False)
    return df


# Remvoe all stopwords from the READMES column
def remove_stop_words(df):
    # import the stopwords from the nltk library
    stop_words = stopwords.words('english')
    df["READMES"] = df["READMES"].apply(lambda x: ' '.join([word for word in x.split() if word not in (stop_words)]))
    return df

# Remove punctiation
def remove_punctuation(df):
    df["READMES"] = df['READMES'].str.replace('[^\w\s]','')
    return df

# Remove all single characters from the READMES column
def remove_single_characters(df):
    df['READMES'] = df['READMES'].str.replace(r'\b\w\b', '').str.replace(r'\s+', ' ')
    return df

# Stemming the READMES form the dataframe column
def stemming(df):
    stemmer= PorterStemmer()
    df['READMES'] = df['READMES'].apply(lambda x: [stemmer.stem(y) for y in x])
    return df



# Call all function to clean and preprosses the READMES
def preprocess(df):
    df = clean_df(df)
    df = remove_stop_words(df)
    df = remove_punctuation(df)
    df = remove_single_characters(df)
    df = stemming(df)
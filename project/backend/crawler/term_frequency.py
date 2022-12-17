import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
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
    return df

# Remove punctiation
def remove_punctuation(df):
    df["READMES"] = df['READMES'].str.replace('[^\w\s]','')
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



# count the word frequency of each user
def word_frequency(df):
    word_frequency_dict = {}
    for username,readme in zip(df["USERNAMES"], df["READMES"].str.lower()):
        word_frequency_dict[username] = {}
        for word in readme.split():
            if word not in word_frequency_dict[username].keys():
                word_frequency_dict[username][word] = 1
            else:
                word_frequency_dict[username][word] += 1
        word_frequency_dict[username] = (sorted(word_frequency_dict[username].items(), key=lambda x: -x[1]))
    return word_frequency_dict

# Call all function to clean and preprosses the READMES
def preprocess(df):
    df = clean_df(df)
    df = remove_stop_words(df)
    df = remove_punctuation(df) 
    df = remove_single_characters(df)
    df = df[df['READMES'].notna()]
    df.to_csv("cleaned_df.csv", index=False)
    return df


## Starting applying the TF-IDF algorithm in sklearn to find out the most occuring job titles in READMES
vectorizer = TfidfVectorizer(analyzer='word', ngram_range=(1, 3), min_df=0.01, stop_words='english')
vectors = vectorizer.fit_transform(df["READMES"])


query = "Computer vison"



def get_recommendations(vectors, query):
    query_vec = vectorizer.transform([query])
    results = cosine_similarity(vectors,query_vec).reshape((-1,))
    for name in results.argsort()[-10:][::-1]:
        print(df.iloc[name,0])
    return results.argsort()[-10:][::-1]




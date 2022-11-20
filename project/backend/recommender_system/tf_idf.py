import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import numpy as np

# Reading the from the csv file
df = pd.read_csv('../user_data_csv/pytorch_pytorch.csv')
df.head()

# Converting the header to a list
def to_list(df):
    return list(df.columns.values)

# Add index to the current dataframe
def add_index(df):
    df_tfidf = df[['bio']]
    df_tfidf['id'] = df_tfidf.index
    df_tfidf = df_tfidf[['id','bio']]
    return df_tfidf

# Vecgtorizing the bio and index column
def get_tfidf_matrix(df_tfidf):
    tf = TfidfVectorizer(analyzer='word', ngram_range=(1, 3), min_df=0, stop_words='english')
    tfidf_matrix = tf.fit_transform(df_tfidf['bio'].values.astype('U'))
    return tfidf_matrix

# Calculate the cosine similarity
def get_cosine_similarities(tfidf_matrix):
    cosine_similarities = linear_kernel(tfidf_matrix, tfidf_matrix)
    return cosine_similarities

# Getting similar items within the dataframe
def get_similar_item(cosine_similarities, df_tfidf, results):
    results = {}
    for idx, row in df_tfidf.iterrows():
        similar_indices = cosine_similarities[idx].argsort()[:-100:-1]
        similar_items = [(cosine_similarities[idx][i], df_tfidf['id'][i]) for i in similar_indices]
        results[row['id']] = similar_items[1:]
    return results

print('done!')


def item(id, df_tfidf):
    return df_tfidf.loc[df_tfidf['id'] == id]['bio'].tolist()[0].split(' - ')[0]


def recommend(item_id, num, results):
    print("Recommending " + str(num) + " products similar to " + item(item_id) + "...")
    print("-------")
    recs = results[item_id][:num]
    for rec in recs:
        print("Recommended: " + item(rec[1]) + " (score:" + str(rec[0]) + ")")

recommend(item_id=11, num=5)
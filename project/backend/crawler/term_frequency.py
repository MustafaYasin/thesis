import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from preprocess import preprocess
from utils import store_match_to_mongodb
from database import db_connection
# Import the csv file with all downloaded READMES
df = pd.read_csv("../user_data_csv/csv_readme_per_user.csv")

df = preprocess(df)

vectorizer = TfidfVectorizer(analyzer='word', ngram_range=(1, 3), min_df=0.01, stop_words='english',  norm='l2')
vectors = vectorizer.fit_transform(df["READMES"])

def calculate_match_point(vectors):
    username_to_match = dict()
    for query in ['computer vision', 'data science', 'ai for health']:
        dict_key = query.replace(" ", "_")
        query_vec = vectorizer.transform([query])
        results = cosine_similarity(vectors,query_vec).reshape((-1,))
        max_match = max(results)
        for index in results.argsort():
            user = df.iloc[index,0]
            match = results[index] / max_match
            username_to_match.setdefault(user, dict()).update({dict_key: match}) 
    return username_to_match

# Apply TF-IDF algorithm to find the most occuring job titles in the READMES

#get_recommendations(vectors, query)
username_to_match = calculate_match_point(vectors)

for username, matches in username_to_match.items():
    print(username, matches)
    store_match_to_mongodb(db_connection, username, matches)
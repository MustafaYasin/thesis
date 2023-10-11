import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from preprocess_data import preprocess  # Custom preprocessing module
from crawler import store_match_to_mongodb, db_connection  # Custom utility for MongoDB storage

# Import and preprocess the README data
df = pd.read_csv("../user_data_csv/csv_readme_per_user.csv")
df = preprocess(df)

# Initialize TF-IDF Vectorizer and fit the README data
vectorizer = TfidfVectorizer(analyzer='word', ngram_range=(1, 3), min_df=0.01, stop_words='english',  norm='l2')
vectors = vectorizer.fit_transform(df["READMES"])

def calculate_match_point(vectors):
    """Calculate match points for predefined queries using cosine similarity."""
    username_to_match = {}
    for query in ['computer vision', 'data science', 'ai for health']:
        dict_key = query.replace(" ", "_")
        query_vec = vectorizer.transform([query])
        results = cosine_similarity(vectors, query_vec).reshape((-1,))
        
        max_match = max(results)
        for index in results.argsort():
            user = df.iloc[index, 0]
            match = results[index] / max_match
            username_to_match.setdefault(user, {}).update({dict_key: match})
            
    return username_to_match

# Calculate match points
username_to_match = calculate_match_point(vectors)

# Store match points in MongoDB
for username, matches in username_to_match.items():
    print(username, matches)
    store_match_to_mongodb(db_connection, username, matches)

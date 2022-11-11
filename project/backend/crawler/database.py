from pymongo import MongoClient
import requests

client = MongoClient(
    "mongodb+srv://mustafa:mustafa@cluster0.jzvhgwl.mongodb.net/?retryWrites=true&w=majority")
db = client['profile']

db_connection = db['real_user']

def run_query(token, query):
    headers = {"Authorization": "token "+ token}
    request = requests.post('https://api.github.com/graphql',
                            json={'query': query}, headers=headers)
    if request.status_code == 200:
        return request.json()
    else:
        raise Exception("Query failed to run by returning code of {}. {}".format(
            request.status_code, query))

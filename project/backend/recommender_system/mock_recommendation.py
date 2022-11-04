from pymongo import MongoClient
from pprint import pprint
client = MongoClient("mongodb+srv://mustafa:mustafa@cluster0.jzvhgwl.mongodb.net/?retryWrites=true&w=majority")
db = client['profile']

real_profile_db = db['real_user']



result = list(real_profile_db.find({}, {'_id': 0}))

pprint(result[0])
email_to_recommendation = dict()

max_repo_count = max(result, key=lambda x: x['repository_count'])['repository_count']


for user in result:
    email = user['email']
    repository_count = user['repository_count']
    hireable = user['hireable']
    recommendation = (repository_count / max_repo_count) * hireable * 100
    real_profile_db.update_one({'email': email}, {'$set': {'recommendations': recommendation}})


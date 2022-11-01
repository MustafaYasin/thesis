import graphene
import csv
import datetime
import requests
import argparse
from pymongo import MongoClient
from flask_restful import Resource, reqparse
import pandas as pd
import json
import pprint


################################# connect to DB #################################

client = MongoClient(
    "mongodb+srv://mustafa:mustafa@cluster0.jzvhgwl.mongodb.net/?retryWrites=true&w=majority")
db = client['profile']

real_profile_db = db['real_user']

real_profile_db.delete_many({})

# Github API token authentication
parser = argparse.ArgumentParser()
parser.add_argument('-t', '--token', required=True, help="The GitHub Token.")
parser.add_argument('-r', '--repo', required=True,
                    help="The GitHub Repo,in the form like 'user/repo'.")
args = parser.parse_args()

owner = args.repo.split('/')[0]
repo = args.repo.split('/')[1]

headers = {"Authorization": "token "+args.token}

# crawled user information from github repo
fields = ["username", "name", "email", "repo_count", "company",
          "avatar_url", "hireable", "star_time"]

# get all the stargazers form the repo


def run_query(query):
    request = requests.post('https://api.github.com/graphql',
                            json={'query': query}, headers=headers)
    if request.status_code == 200:
        return request.json()
    else:
        raise Exception("Query failed to run by returning code of {}. {}".format(
            request.status_code, query))


################################# get all users #################################
query = """
{{
  repository(owner: "{0}", name: "{1}") {{
    stargazers(first: 100 {2}) {{
      pageInfo {{
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }}
      edges {{
        starredAt
        node {{
          login
          email
          name
          bio
          company
          repositories(first:100, isFork: false) {{
            totalCount
          }}
          isHireable
          avatarUrl
          createdAt
          updatedAt
          twitterUsername
          websiteUrl
          followers(first: 0) {{
            totalCount
          }}
          following(first: 0) {{
            totalCount
          }}
        }}
      }}
    }}
  }}
}}
"""

############################### 1. get all stargazers ###############################

star_list = []
hasNextPage = True
endCursor = ""  # Start from begining
count = 0


############################### Add user data to the database ########################
user_filename = owner + "__" + repo + ".csv"
with open(user_filename, 'w') as stars:
    stars_writer = csv.writer(stars)
    stars_writer.writerow(fields)
    while hasNextPage:
        this_query = query.format(owner, repo, endCursor)
        result = run_query(this_query)  # Execute the query
        hasNextPage = result['data']['repository']['stargazers']['pageInfo']['hasNextPage']
        endCursor = result['data']['repository']['stargazers']['pageInfo']['endCursor']
        endCursor = ', after: "' + endCursor + '"'
        data = result['data']['repository']['stargazers']['edges']

        for item in data:
            username = item['node']['login']
            name = item['node']['name']
            email = item['node']['email']

            hireable = item['node']['isHireable']
            company = item['node']['company']
            avatar_url = item['node']['avatarUrl']

            repo_count = item['node']['repositories']['totalCount']

            star_time = datetime.datetime.strptime(
                item['starredAt'], '%Y-%m-%dT%H:%M:%SZ')
            star_time = star_time.strftime('%Y-%m-%d %H:%M:%S')
            star_list.append((username, star_time))

            # write to csv file
            stars_writer.writerow([username, name, email, repo_count, company,
                                  avatar_url, hireable, star_time, repo_count])

            # write to MongoDB
            real_profile_db.update_one(
                {
                    "email": email
                },
                {
                    '$set': {
                        'username': username,
                        'fullName': name,
                        'repo_count': repo_count,
                        'avatar_url': avatar_url,
                        'hireable': hireable,
                        'star_time': star_time
                    }
                },
                upsert=True
            )

        count = count + 100
        print(str(count) + " users processed.")
        break

from collections import Counter
import datetime
from random import randrange
from graphql_query import domain
from random import randint
import random 
import wget
from markdown import markdown
from bs4 import BeautifulSoup
import urllib.request as urllib2
import os
from pprint import pprint
import csv
import pandas as pd
import json




HOST = "https://raw.githubusercontent.com"
BRANCH = 'master'

def get_readme(node):
    owner = node['login']
    repo_info = node['repositories']["nodes"]
    repo_list = [repo["name"] for repo in repo_info]

    readme_list = []

    for repo in repo_list:
        url = f"{HOST}/{owner}/{repo}/{BRANCH}/README.md"
        try:
            readme = wget.download(url, out="../user_data_csv/README.md")
        except urllib2.HTTPError:
            continue

        with open(readme, 'r') as f:
        
            markdown_text = f.read()

            html = markdown(markdown_text)

            text = ' '.join(BeautifulSoup(html, features="lxml").findAll(text=True))

            readme_list.append(text)

            os.remove(readme)

    return readme_list




def retrieve_fields(item, domain):
    node = item['node']
    nodes = node['repositories']["nodes"]
    star_time = datetime.datetime.strptime(
        item['starredAt'], '%Y-%m-%dT%H:%M:%SZ').strftime('%Y-%m-%d %H:%M:%S')
    primary_language = [
        node["primaryLanguage"]["name"] for node in nodes if node["primaryLanguage"] is not None
    ]
    
    primary_language = dict(Counter(primary_language))
    
    result = {
        'username': node['login'],
        'fullName': node['name'],
        'bio': node['bio'],
        'email': node['email'],
        'readme': get_readme(node),
        'location': node['location'],
        'isHireable': node['isHireable'],
        'company': node['company'],
        'yearsofExperience': randint(1, 10),
        'domainofExpertise': random.choice(domain),
        'activity': randint(1, 100), 
        'feature_1': randint(1, 100)/100,
        'feature_2': randint(1, 100)/100,
        'feature_3': randint(1, 100)/100,
        'totalOfFeatures': 0,
        'isEmployee': node['isEmployee'],
        'avatar_url': node['avatarUrl'],
        'createdAt': node['createdAt'],
        'updatedAt': node['updatedAt'],
        'twitterUsername': node['twitterUsername'],
        'isGitHubStar': node['isGitHubStar'],
        'isCampusExpert': node['isCampusExpert'],
        'isDeveloperProgramMember': node['isDeveloperProgramMember'],
        'isSiteAdmin': node['isSiteAdmin'],
        'isViewer': node['isViewer'],
        'anyPinnableItems': node['anyPinnableItems'],
        'viewerIsFollowing': node['viewerIsFollowing'],
        'sponsors': node['sponsors']['totalCount'],
        'followers': node['followers']['totalCount'],
        'following': node['following']['totalCount'],
        'organizations': node['organizations']['totalCount'],
        'repository_count': node['repositories']['totalCount'],
        'star_time': star_time,
        'primary_language': primary_language
    }



    return result


def store_to_mongodb(db, data):
    email = data.pop('email')
    db.update_one(
        {
            "email": email
        },

        {
            '$set': data
        },
        upsert=True
    )

def store_match_to_mongodb(db, username, matches):
    result = db.update_one(
        {
            "username": username
        },

        {
            '$set': {
                "computer_vision": matches.get('computer_vision'),
                "data_science": matches.get('data_science'),
                "ai_for_health": matches.get('ai_for_health')
            }
        },
        upsert=False
    )
    print(result.modified_count)


def store_repo_to_csv(writer, node):
    writer.writerow([node['username'], node['fullName'], node['bio'], node['email'], node['readme'], ['repository_count'], node['company'], 
                    node['avatar_url'], node['isHireable'], node['star_time'], node['followers'], node['following'], node['organizations'],
                    node['createdAt'], node['updatedAt'], node['twitterUsername'], node['isGitHubStar'], node['isCampusExpert'], 
                    node['isDeveloperProgramMember'], node['isSiteAdmin'], node['isViewer'], node['anyPinnableItems'], node['viewerIsFollowing'], 
                    node['sponsors'], node['primary_language'], node['yearsofExperience'], node['location'], node['domainofExpertise'], node['activity'],
                    node['feature_1'], node['feature_2'], node['feature_3'], node['totalOfFeatures']])


# create a function to find out how many lines of code each user has written

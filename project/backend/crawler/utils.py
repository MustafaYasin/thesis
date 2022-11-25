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



# wget https://raw.githubusercontent.com/{owner}/{repo}/{branch}/README.md
HOST = "https://raw.githubusercontent.com"
BRANCH = 'master'

# Function to download the README.md file from each repository
def get_readme(node):
    owner = node['login']
    repo_info = node['repositories']["nodes"]
    repo_list = [repo["name"] for repo in repo_info]
    #print(f"This is a list of repo names for user: {owner}", repo_list)

    readme_list = []

    for repo in repo_list:
        url = f"{HOST}/{owner}/{repo}/{BRANCH}/README.md"
        try:
            readme = wget.download(url, out="../user_data_csv/README.md")
        except:
            continue

        # Create a dictionary to store the the readme files from each repository of the user

        # Open the downloaded Markdown file and read it into a variable
        # After that, convert the Markdown to HTML
        with open(readme, 'r') as f:
        
            markdown_text = f.read()

            # Convert the Markdown to HTML
            html = markdown(markdown_text)

            # Extract the text from the HTML
            text = ' '.join(BeautifulSoup(html, features="lxml").findAll(text=True))

            # Add the README text to the dictionary
            readme_list.append(text)

            # Remove the downloaded README.md file
            os.remove(readme)
    #print("This is readme list \n ", readme_list)
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


    user_readme = "../user_data_csv/recommendation.csv"
    for user_info in result.keys():

        username = result["username"]
        readme_list = result["readme"]

        with open(user_readme, "a") as f:
            writer = csv.writer(f)
            writer.writerow([username, readme_list])
            for readme in readme_list:
                f.write(username + readme + '\n')


    return result

"""
user_readme = "../user_data_csv/recommendation.csv"
def store_readme_to_csv(result):
    for user_info in result:
        print("##################################################################################################")
        username = user_info["username"]
        print("This is user info: ", user_info)
        readme_list = user_info["readme"]
        print("This is readme: ", readme_list)

        for readme in readme_list:
            print("This is readme: ", readme)
            with open(user_readme, "w") as f:
                f.write(username, readme, '\n')
                f.close()
"""    


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


def store_to_csv(writer, node):
    writer.writerow([node['username'], node['fullName'], node['bio'], node['email'], node['readme'], ['repository_count'], node['company'], 
                    node['avatar_url'], node['isHireable'], node['star_time'], node['followers'], node['following'], node['organizations'],
                    node['createdAt'], node['updatedAt'], node['twitterUsername'], node['isGitHubStar'], node['isCampusExpert'], 
                    node['isDeveloperProgramMember'], node['isSiteAdmin'], node['isViewer'], node['anyPinnableItems'], node['viewerIsFollowing'], 
                    node['sponsors'], node['primary_language'], node['yearsofExperience'], node['location'], node['domainofExpertise'], node['activity'],
                    node['feature_1'], node['feature_2'], node['feature_3'], node['totalOfFeatures']])



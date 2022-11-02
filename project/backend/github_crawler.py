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
from collections import Counter

################################# connect to DB #################################

client = MongoClient(
    "mongodb+srv://mustafa:mustafa@cluster0.jzvhgwl.mongodb.net/?retryWrites=true&w=majority")
db = client['profile']

real_profile_db = db['real_user']

#real_profile_db.delete_many({})

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
          "avatar_url", "hireable", "star_time", "primary_language", "followers", "following", "starredRepositories", "repositories", "repositoriesContributedTo", "organizations", "organizationsContributedTo", "createdAt", "updatedAt", "twitterUsername", "isGitHubStar", "isCampusExpert", "isDeveloperProgramMember", "isSiteAdmin", "isViewer", "anyPinnableItems", "viewerIsFollowing", "monthlyEstimatedSponsorsIncomeInDollars", "monthlyEstimatedSponsorsIncomeInEuros", "sponsors"]


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
          location
          isEmployee
          isHireable
          avatarUrl
          createdAt
          updatedAt
          twitterUsername
          websiteUrl
          isGitHubStar
          isCampusExpert
          isDeveloperProgramMember
          isSiteAdmin
          isViewer
          anyPinnableItems
          viewerIsFollowing
          websiteUrl
          monthlyEstimatedSponsorsIncomeInCents
          estimatedNextSponsorsPayoutInCents
          sponsors{{
            totalCount
          }}
          starredRepositories {{
            totalCount
          }}
          repositories {{
            totalCount
          }}
          repositoriesContributedTo {{
            totalCount
          }}
          organizations {{
            totalCount
          }}
          # organizationsContributedTo {{
          #   totalCount
          # }}
          repositories {{
            totalCount
            nodes {{
              primaryLanguage {{
                name
              }}
            }}
          }}

          followers {{
            totalCount
          }}

          following {{
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
            bio = item['node']['bio']
            email = item['node']['email']
            location = item['node']['location']

            isHireable = item['node']['isHireable']
            company = item['node']['company']
            isEmployee = item['node']['isEmployee']

            avatar_url = item['node']['avatarUrl']

            repositories = item['node']['repositories']
            repo_count = item['node']['repositories']['totalCount']
            createdAt = item['node']['createdAt']
            updatedAt = item['node']['updatedAt']
            twitterUsername = item['node']['twitterUsername']
            isGitHubStar = item['node']['isGitHubStar']

            isCampusExpert = item['node']['isCampusExpert']
            isDeveloperProgramMember = item['node']['isDeveloperProgramMember']
            isSiteAdmin = item['node']['isSiteAdmin']
            isViewer = item['node']['isViewer']
            anyPinnableItems = item['node']['anyPinnableItems']
            viewerIsFollowing = item['node']['viewerIsFollowing']

            monthlyEstimatedSponsorsIncomeInDollars = item[
                'node']['monthlyEstimatedSponsorsIncomeInDollars']
            monthlyEstimatedSponsorsIncomeInEuros = item['node']['monthlyEstimatedSponsorsIncomeInEuros']

            sponsors = item['node']['sponsors']['totalCount']
            followers = item['node']['followers']['totalCount']
            following = item['node']['following']['totalCount']
            starredRepositories = item['node']['starredRepositories']['totalCount']
            repositories = item['node']['repositories']['totalCount']
            repositoriesContributedTo = item['node']['repositoriesContributedTo']['totalCount']
            organizations = item['node']['organizations']['totalCount']
            organizationsContributedTo = item['node']['organizationsContributedTo']['totalCount']

            nodes = item['node']['repositories']["nodes"]
            primary_language = [
                node["primaryLanguage"]["name"] for node in nodes if node["primaryLanguage"] is not None
            ]
            primary_language = dict(Counter(primary_language))

            star_time = datetime.datetime.strptime(
                item['starredAt'], '%Y-%m-%dT%H:%M:%SZ')
            star_time = star_time.strftime('%Y-%m-%d %H:%M:%S')
            star_list.append((username, star_time))

            # write to csv file
            stars_writer.writerow([username, name, bio, email, repo_count, company,
                                  avatar_url, isHireable, star_time, repo_count, primary_language, followers, following, starredRepositories, repositories, repositoriesContributedTo, organizations, organizationsContributedTo, createdAt, updatedAt, twitterUsername, isGitHubStar, isCampusExpert, isDeveloperProgramMember, isSiteAdmin, isViewer, anyPinnableItems, viewerIsFollowing, monthlyEstimatedSponsorsIncomeInDollars, monthlyEstimatedSponsorsIncomeInEuros, sponsors])

            # write to MongoDB
            real_profile_db.update_one(
                {
                    "email": email
                },
                {
                    '$set': {
                        'username': username,
                        'fullName': name,
                        'bio': bio,
                        'email': email,
                        'location': location,
                        'hireable': isHireable,
                        'company': company,
                        'isEmployee': isEmployee,
                        'avatar_url': avatar_url,
                        'createdAt': createdAt,
                        'updatedAt': updatedAt,
                        'twitterUsername': twitterUsername,
                        'isGitHubStar': isGitHubStar,
                        'isCampusExpert': isCampusExpert,
                        'isDeveloperProgramMember': isDeveloperProgramMember,
                        'isSiteAdmin': isSiteAdmin,
                        'isViewer': isViewer,
                        'anyPinnableItems': anyPinnableItems,
                        'viewerIsFollowing': viewerIsFollowing,
                        'monthlyEstimatedSponsorsIncomeInDollars': monthlyEstimatedSponsorsIncomeInDollars,
                        'monthlyEstimatedSponsorsIncomeInEuros': monthlyEstimatedSponsorsIncomeInEuros,
                        'sponsors': sponsors,
                        'followers': followers,
                        'following': following,
                        'starredRepositories': starredRepositories,
                        'repositoriesContributedTo': repositoriesContributedTo,
                        'organizations': organizations,
                        'organizationsContributedTo': organizationsContributedTo,
                        'repo_count': repo_count,
                        'avatar_url': avatar_url,
                        'star_time': star_time,
                        'primary_language': primary_language

                    }
                },
                upsert=True
            )

        count = count + 100
        print(str(count) + " users processed.")
        break

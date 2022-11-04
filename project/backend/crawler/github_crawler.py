import csv
import requests
import argparse
from flask_restful import Resource, reqparse
import pandas as pd
from graphql_query import query, fields
from database import db_connection, run_query
from utils import retrieve_fields, store_to_mongodb, store_to_csv
################################# connect to DB #################################




# Github API token authentication
parser = argparse.ArgumentParser()
parser.add_argument('-t', '--token', required=True, help="The GitHub Token.")
parser.add_argument('-r', '--repo', required=True,
                    help="The GitHub Repo,in the form like 'user/repo'.")
args = parser.parse_args()

owner = args.repo.split('/')[0]
repo = args.repo.split('/')[1]
token = args.token
# get all the stargazers form the repo

star_list = []
hasNextPage = True
endCursor = ""  # Start from begining
count = 0


def retrieve_current_cursor(owner, repo, token, endCursor):
    formatted_query = query.format(owner, repo, endCursor)
    result = run_query(token, formatted_query)  # Execute the query
    hasNextPage = result['data']['repository']['stargazers']['pageInfo']['hasNextPage']
    endCursor = result['data']['repository']['stargazers']['pageInfo']['endCursor']
    endCursor = ', after: "' + endCursor + '"'
    data = result['data']['repository']['stargazers']['edges']

    for item in data:
        entry = retrieve_fields(item)
        # write to csv file
        store_to_csv(stars_writer, entry)
        # write to MongoDB
        store_to_mongodb(db_connection, entry)
    return hasNextPage, endCursor 


############################### Add user data to the database ########################
user_filename = "../user_data_csv/" + owner + "_" + repo + ".csv"
with open(user_filename, 'w') as stars:
    stars_writer = csv.writer(stars)
    stars_writer.writerow(fields)
    while hasNextPage:
        hasNextPage, endCursor = retrieve_current_cursor(owner, repo, token, endCursor)     
        count = count + 100
        print(str(count) + " users processed.")

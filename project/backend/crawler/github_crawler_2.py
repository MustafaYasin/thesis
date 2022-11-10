import csv
import requests
import argparse
from flask_restful import Resource, reqparse
import pandas as pd
from graphql_query import query, fields
from database import db_connection, run_query
from utils import retrieve_fields, store_to_mongodb, store_to_csv, domain
from graphql_query import domain





# Github API token authentication
parser = argparse.ArgumentParser()
parser.add_argument('-t', '--token', required=True, help="The GitHub Token.")
parser.add_argument('-r', '--repo', required=True,
                    help="The GitHub Repo,in the form like 'user/repo'.")
args = parser.parse_args()

# Arguments given by user whiel running the script
owner = args.repo.split('/')[0]
repo = args.repo.split('/')[1]
token = args.token



# star_list = []
hasNextPage = True
endCursor = ""  
count = 0

# This function is used to retrieve the current page of the data
def retrieve_current_cursor(owner, repo, token):
    formatted_query = query.format(owner, repo)
    result = run_query(token, formatted_query)  
    from pprint import pprint
    pprint(result)
    hasNextPage = result['data']['repository']['stargazers']['pageInfo']['hasNextPage']
    print(hasNextPage)
    #endCursor = result['data']['repository']['stargazers']['pageInfo']['endCursor']
    #endCursor = ', after: "' + endCursor + '"'
    data = result['data']['repository']['stargazers']['edges']

    # Looping through retrieved data and storing it in CSV and MongoDB
    for item in data:
        entry = retrieve_fields(item, domain)
        # write to csv file
        store_to_csv(stars_writer, entry)
        # write to MongoDB
        store_to_mongodb(db_connection, entry)
    return hasNextPage, endCursor 


# Creating a CSV file to store the data
user_filename = "../user_data_csv/" + owner + "_" + repo + ".csv"
with open(user_filename, 'w') as stars:
    stars_writer = csv.writer(stars)
    stars_writer.writerow(fields)
    while hasNextPage:
        hasNextPage = retrieve_current_cursor(owner, repo, token)     
        count = count + 100
        print(str(count) + " users processed.")

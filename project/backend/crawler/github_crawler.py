import csv
import requests
import argparse
from flask_restful import Resource, reqparse
import pandas as pd
from graphql_query import query, fields
from database import db_connection, run_query
from utils import retrieve_fields, store_to_mongodb, store_repo_to_csv, domain, get_readme
from graphql_query import domain
from term_frequency import store_readme_to_csv
from sys import getsizeof
import os




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
def retrieve_current_cursor(owner, repo, token, endCursor):
    formatted_query = query.format(owner, repo, endCursor)
    result = run_query(token, formatted_query)
    #print("these are the results", result)
    hasNextPage = result['data']['repository']['stargazers']['pageInfo']['hasNextPage']
    endCursor = result['data']['repository']['stargazers']['pageInfo']['endCursor']
    endCursor = ', after: "' + endCursor + '"'
    #print("endcorsor", endCursor)
    data = result['data']['repository']['stargazers']['edges']

    with open('../user_data_csv/csv_readme_per_user.csv', 'a+', newline='') as csvfile:
        readmewriter = csv.writer(csvfile, delimiter=",",
                            quotechar='"', quoting=csv.QUOTE_MINIMAL)
        readmewriter.writerow(['USERNAME', 'README'])

        # Looping through retrieved data and storing it in CSV and MongoDB
        for item in data:
            result = retrieve_fields(item, domain)
            
            readme = " ".join(result["readme"])
            username = result["username"]
            
            readmewriter.writerow([username, readme])

            
            # dataframe = store_readme_to_csv(result)

            # # write all users from main repository to csv file
            # store_repo_to_csv(stars_writer, result)
            # # write to MongoDB
            # store_to_mongodb(db_connection, result)
        exit()
        return hasNextPage, endCursor 


# Creating a CSV file to store the data
user_filename = "../user_data_csv/" + owner + "_" + repo + ".csv"
with open(user_filename, 'w') as stars:
    stars_writer = csv.writer(stars)
    stars_writer.writerow(fields)
    while hasNextPage:
        hasNextPage, endCursor = retrieve_current_cursor(owner, repo, token, endCursor)  
        print("hasNextPage", hasNextPage)
        print("endCursor", endCursor)   
        count = count + 100
        print(str(count) + " users processed.")



with open('eggs.csv', 'w', newline='\n') as csvfile:
    spamwriter = csv.writer(csvfile, delimiter=",",
                            quotechar='|', quoting=csv.QUOTE_MINIMAL)
    spamwriter.writerow(['Spam', 'Lovely Spam', 'Wonderful Spam'])    
    spamwriter.writerow(['Spam', 'Lovely Spam', 'Wonderful Spam'])
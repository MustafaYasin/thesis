import csv
import argparse
from graphql_query import query, fields, domain
from database import db_connection, run_query
from utils import retrieve_fields, store_to_mongodb, get_readme
from sys import getsizeof

# Initialize Argument Parser and Add Arguments
parser = argparse.ArgumentParser(description='GitHub API token and repo information.')
parser.add_argument('-t', '--token', required=True, help="GitHub API Token.")
parser.add_argument('-r', '--repo', required=True, help="GitHub Repository in 'user/repo' format.")
args = parser.parse_args()

# Extract Owner and Repo Info from User Arguments
owner, repo = args.repo.split('/')
token = args.token

# Initialize Pagination Variables
hasNextPage = True
endCursor = ""
count = 0

def retrieve_current_cursor(owner, repo, token, endCursor):
    """
    Retrieve the current cursor (page) of data from the GitHub API.

    Parameters:
    - owner: The GitHub repository owner.
    - repo: The GitHub repository name.
    - token: The GitHub API token.
    - endCursor: The cursor for pagination.

    Returns:
    - hasNextPage: Boolean indicating if more pages are available.
    - endCursor: Updated cursor for pagination.
    """
    formatted_query = query.format(owner, repo, endCursor)
    result = run_query(token, formatted_query)
    
    hasNextPage = result['data']['repository']['stargazers']['pageInfo']['hasNextPage']
    endCursor = f', after: "{result["data"]["repository"]["stargazers"]["pageInfo"]["endCursor"]}"'
    
    data = result['data']['repository']['stargazers']['edges']

    # Write Data to CSV and MongoDB
    with open('../user_data_csv/csv_readme_per_user.csv', 'a+', newline='') as csvfile:
        readmewriter = csv.writer(csvfile, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        readmewriter.writerow(['USERNAMES', 'READMES'])
        
        for item in data:
            user_data = retrieve_fields(item, domain)
            readme = ' '.join(user_data["readme"])
            readmewriter.writerow([user_data["username"], readme])
            store_to_mongodb(db_connection, user_data)
            
    return hasNextPage, endCursor

# Main Execution
if __name__ == "__main__":
    user_filename = f"../user_data_csv/{owner}_{repo}.csv"
    with open(user_filename, 'w') as csv_file:
        csv_writer = csv.writer(csv_file)
        csv_writer.writerow(fields)
        
        while hasNextPage:
            hasNextPage, endCursor = retrieve_current_cursor(owner, repo, token, endCursor)
            count += 100
            print(f"{count} users processed.")

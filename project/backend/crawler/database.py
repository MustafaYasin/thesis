from pymongo import MongoClient
import requests

# Initialize MongoDB client and database connection
client = MongoClient(
    "mongodb+srv://mustafa:mustafa@cluster0.jzvhgwl.mongodb.net/?retryWrites=true&w=majority")
db = client['profile']
db_connection = db['real_user']

def run_query(token, query):
    """
    Run a GraphQL query using GitHub's API.

    Parameters:
        token (str): The GitHub authentication token.
        query (str): The GraphQL query to be executed.

    Returns:
        dict: The JSON response from the API if successful, otherwise raises an exception.
    """
    
    # Set up the headers for the API request
    headers = {"Authorization": f"token {token}"}

    # Make a POST request to GitHub's GraphQL API
    request = requests.post('https://api.github.com/graphql', json={'query': query}, headers=headers)

    # Check the request status and return the JSON response if successful
    if request.status_code == 200:
        return request.json()
    else:
        raise Exception(f"Query failed to run by returning code of {request.status_code}. {query}")

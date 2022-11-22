import json
import wget
import time
import csv
import requests
import math



# Global variables used across the script
URL = "https://api.github.com/search/repositories?q="  # The basic URL to use the GitHub API
QUERY = "user:MustafaYasin"  # The personalized query (for instance, to get repositories from user 'MustafaYasin')
SUB_QUERIES = ["+created%3A<%3D2021-03-31",
              "+created%3A>%3D2014-01-01"]  # Different sub-queries if you need to collect more than 1000 elements
PARAMETERS = "&per_page=100"  # Additional parameters for the query (by default 100 items per page)
DELAY_BETWEEN_QUERIES = 10  # The time to wait between different queries to GitHub (to avoid be banned)
OUTPUT_FOLDER = "../user_data_csv/"  # Folder where ZIP files will be stored
OUTPUT_CSV_FILE = "../user_data_csv/repositories.csv"  # Path to the CSV file generated as output


# Getting a response from the URL and save it in a JSON file
def getUrl(url):
    """ Given a URL it returns its body """
    response = requests.get(url)
    print("Response getting from the requset: ", response)
    return response.json()


# Function to download the saved data in zip file
def download_zip(download_url, out_file_path, user, repository, clone_url):
    try:
        wget.download(download_url, out=out_file_path)
        repositories.writerow([user, repository, clone_url, "downloaded"])
    except Exception as e:
        print("Could not download file {}".format(download_url))
        print(e)
        repositories.writerow([user, repository, clone_url, "error when downloading"])


# Function to get the number of pages to collect and save them in zip file
def make_zip(item):
    user = item['owner']['login']
    repository = item['name']
    # Download the zip file of the current project
    print("Downloading repository '%s' from user '%s' ..." % (repository, user))
    clone_url = item['clone_url']
    fileToDownload = url[0:len(url) - 4] + "/archive/refs/heads/master.zip"
    fileName = item['full_name'].replace("/", "#") + ".zip"
    return fileToDownload, fileName, user, repository, clone_url


# Function to obtain the number of pages for the current subquery
def results_in_different_pages(currentPage, numberOfPages, URL, QUERY, SUB_QUERIES, PARAMETERS):
    print("Processing page " + str(currentPage) + " of " + str(numberOfPages) + " ...")
    url = URL + QUERY + str(SUB_QUERIES[subquery - 1]) + PARAMETERS + "&page=" + str(currentPage)
    data = json.loads(json.dumps(getUrl(url)))
    return data, url


# Function to 
def obtain_number_of_pages(subquery, URL, QUERY, SUB_QUERIES, PARAMETERS):
    print("Processing subquery " + str(subquery) + " of " + str(len(SUB_QUERIES)) + " ...")
    url = URL + QUERY + str(SUB_QUERIES[subquery - 1]) + PARAMETERS
    data = json.loads(json.dumps(getUrl(url)))
    numberOfPages = math.ceil(data['total_count'] / 100)

    print("No. of pages = " + str(numberOfPages))
    print("No. of pages = " + str(numberOfPages))
    
    return numberOfPages


# To save the number of repositories processed
countOfRepositories = 0

# Output CSV file which will contain information about repositories
with open(OUTPUT_CSV_FILE, 'w') as csv_file:
    repositories = csv.writer(csv_file, delimiter=',')

    # Run queries to get information in json format and download ZIP file for each repository
    for subquery in range(1, len(SUB_QUERIES) + 1):
        
        # Obtain the number of pages for the current subquery (by default each page contains 100 items)
        numberOfPages = obtain_number_of_pages(subquery, URL, QUERY, SUB_QUERIES, PARAMETERS)

        # Results are in different pages
        for currentPage in range(1, numberOfPages + 1):
            
            # Get the data for different pages
            data, url = results_in_different_pages(currentPage, numberOfPages, URL, QUERY, SUB_QUERIES, PARAMETERS)

            # Iteration over all the repositories in the current json content page
            for item in data['items']:
                # Obtain user and repository names
                fileToDownload, fileName, user, repository, clone_url = make_zip(item)
                download_zip(fileToDownload, OUTPUT_FOLDER + fileName, user, repository, clone_url)
                # Update repositories counter
                countOfRepositories = countOfRepositories + 1

        # A delay between different sub-queries
        if subquery < len(SUB_QUERIES):
            print("Sleeping " + str(DELAY_BETWEEN_QUERIES) + " seconds before the new query ...")
            time.sleep(DELAY_BETWEEN_QUERIES)

    print("DONE! " + str(countOfRepositories) + " repositories have been processed.")

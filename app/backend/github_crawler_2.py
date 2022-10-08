import graphene
import csv
import datetime
import requests
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('-t','--token',required=True,help="The GitHub Token.")
parser.add_argument('-r','--repo',required=True,help="The GitHub Repo,in the form like 'user/repo'.")
args = parser.parse_args()

owner = args.repo.split('/')[0]
repo = args.repo.split('/')[1]

headers = {"Authorization": "token "+args.token}

fields = ["username", "name", "email", "repo_count", "company", "avatar_url", "hireable", "star_time"]

def run_query(query):
    request = requests.post('https://api.github.com/graphql', json={'query': query}, headers=headers)
    if request.status_code == 200:
        return request.json()
    else:
        raise Exception("Query failed to run by returning code of {}. {}".format(request.status_code, query))


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

star_list = []
hasNextPage = True
endCursor = "" # Start from begining
count = 0

user_filename = owner + "__" + repo + ".csv"
with open(user_filename, 'w') as stars:
    stars_writer = csv.writer(stars)
    stars_writer.writerow(fields)
    while hasNextPage:
        this_query = query.format(owner,repo,endCursor)
        result = run_query(this_query) # Execute the query
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

            star_time = datetime.datetime.strptime(item['starredAt'],'%Y-%m-%dT%H:%M:%SZ')
            star_time = star_time.strftime('%Y-%m-%d %H:%M:%S')
            star_list.append((username,star_time))
            stars_writer.writerow([username,name,email,repo_count,company,avatar_url,hireable,star_time])

        count = count + 100
        print(str(count) + " users processed.")
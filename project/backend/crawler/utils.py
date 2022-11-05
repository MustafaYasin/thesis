from collections import Counter
import datetime
from random import randrange
from graphql_query import domain
import random



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
        'location': node['location'],
        'isHireable': node['isHireable'],
        'company': node['company'],
        'yearsofExperience': randrange(1, 10), # Generate random number between 1 and 10
        'domainofExpertise': random.choice(domain),
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


def store_to_csv(writer, node):
    writer.writerow([node['username'], node['fullName'], node['bio'], node['email'], node['repository_count'], node['company'], 
                    node['avatar_url'], node['isHireable'], node['star_time'], node['followers'], node['following'], node['organizations'],
                    node['createdAt'], node['updatedAt'], node['twitterUsername'], node['isGitHubStar'], node['isCampusExpert'], 
                    node['isDeveloperProgramMember'], node['isSiteAdmin'], node['isViewer'], node['anyPinnableItems'], node['viewerIsFollowing'], 
                    node['sponsors'], node['primary_language'], node['yearsofExperience'], node['location'], node['domainofExpertise']])



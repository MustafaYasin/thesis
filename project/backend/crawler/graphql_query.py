# GraphQL query template to fetch GitHub repository stargazers and their profiles
query = """
{{
  repository(owner: "{0}", name: "{1}") {{
    stargazers(first: 50 {2}) {{
      pageInfo {{
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }}
      edges {{
        starredAt
        node {{
          # User Profile Fields
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

          # Repository related fields
          repositories (first: 100, isFork: false) {{
            totalCount
            nodes {{
              primaryLanguage {{
                name
              }}
              name
            }}
          }}
          
          # Organization, Sponsors, and Followers
          sponsors {{
            totalCount
          }}
          organizations {{
            totalCount
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

# List of field names that will be stored in the CSV file
fields = [
    "username", "fullName", "bio", "email", "repository_count",
    "company", "avatar_url", "isHireable", "star_time",
    "followers", "following", "organizations", "repositories",
    "createdAt", "updatedAt", "twitterUsername", "isGitHubStar",
    "isCampusExpert", "isDeveloperProgramMember", "isSiteAdmin",
    "isViewer", "anyPinnableItems", "viewerIsFollowing", "sponsors",
    "primary_language", "yearsofExperience", "location", "domainofExpertise"
]

# List of various domains of expertise
domain = [
    'AI for Medicine', 'Machine Learning', 'Computer Vision', 'Reinforcement Learning',
    'Data Engineering', 'AI for Education', 'Natural Language',
    # ... more domains
    'Data Analytics', 'Data Science'
]

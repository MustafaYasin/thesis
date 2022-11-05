

query = """
{{
  repository(owner: "{0}", name: "{1}") {{
    stargazers(first: 100) {{
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
          repositories (first: 100, isFork: false) {{
            totalCount
            nodes {{
              primaryLanguage {{
                name
              }}
            }}
          }}
          
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

# crawled user information from github repo
fields = ["username", "fullName", "email", "repo_count", "company",
          "avatar_url", "hireable", "star_time", "primary_language",
          "followers", "following", "starredRepositories", "repositories",
          "repositoriesContributedTo", "organizations", "organizationsContributedTo",
          "createdAt", "updatedAt", "twitterUsername", "isGitHubStar", "isCampusExpert",
          "isDeveloperProgramMember", "isSiteAdmin", "isViewer", "anyPinnableItems", "viewerIsFollowing",
          "monthlyEstimatedSponsorsIncomeInDollars", "monthlyEstimatedSponsorsIncomeInEuros", "sponsors"]


query = """
{{
  repository(owner: "{0}", name: "{1}") {{
    stargazers(first: 1000) {{
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

# Columns header stored in CSV file
fields = ["username", "fullName", "bio", "email", "repository_count",
          "company", "avatar_url", "isHireable", "star_time",
          "followers", "following", "organizations", "repositories",
          "createdAt", "updatedAt", "twitterUsername", "isGitHubStar",
          "isCampusExpert", "isDeveloperProgramMember", "isSiteAdmin",
          "isViewer", "anyPinnableItems", "viewerIsFollowing", "sponsors",
          "primary_language", "yearsofExperience", "location", "domainofExpertise"]

domain = ['AI for Medicine', 'Machine Learning', 'Computer Vision', 'Reinfrocement Learning', 'Data Engineering', 'AI for Education', 'Natural Languag',
          'AI for Healthcare', 'AI for Social Good', 'AI for Manufacturing', 'AI for Finance', 'AI for Cybersecurity', 'AI for Marketing', 'AI for Law',
          'Backend', 'Frontend', 'Fullstack', 'Mobile', 'DevOps', 'Data Science', 'Data Engineering', 'Data Analysis', 'Data Visualization', 'Data Mining', 'Data Management',
          'Data Security', 'Data Architecture', 'Data Modeling', 'Data Governance', 'Data Quality', 'Data Integration', 'Data Warehousing', 'Data Analytics', 'Data Science',]






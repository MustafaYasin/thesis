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
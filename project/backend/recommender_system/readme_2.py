import wget


# wget https://raw.githubusercontent.com/{owner}/{repo}/{branch}/README.md
URL = "https://raw.githubusercontent.com"
OWNER = 'MustafaYasin'
REPO = "MustafaYasin"
BRANCH = "main" 

def get_readme(URL, OWNER, REPO, BRANCH):
    url = URL +'/' + OWNER + '/' + REPO + '/' + BRANCH + '/' + "README.md"
    readmeMarkdown = wget.download(url)
    readme = readmeMarkdown.to_string()
    return readme

print(get_readme(URL, OWNER, REPO, BRANCH))




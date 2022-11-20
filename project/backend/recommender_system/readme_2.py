import wget
from markdown import markdown
from bs4 import BeautifulSoup
import re

# # wget https://raw.githubusercontent.com/{owner}/{repo}/{branch}/README.md
URL = "https://raw.githubusercontent.com"
OWNER = 'MustafaYasin'
REPO = "MustafaYasin"
BRANCH = "main" 

def get_readme():
    url = URL +'/' + OWNER + '/' + REPO + '/' + BRANCH + '/' + "README.md"
    readme = wget.download(url, out="../user_data_csv/README.text", )
    return readme

def markdown_to_text():
    readme = get_readme()
    html = markdown(readme)
    text = ''.join(BeautifulSoup(html, features="lxml").findAll(text=True))
    return text


print(markdown_to_text())








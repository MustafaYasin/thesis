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
    readme = wget.download(url, out="../user_data_csv/README.md", )
    # html = markdown('../user_data_csv/README.md')
    # text = ''.join(BeautifulSoup(html, features="lxml").findAll(text=True))
    # print (text)
    return readme


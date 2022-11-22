import wget
from markdown import markdown
from bs4 import BeautifulSoup
import re
import os



# # wget https://raw.githubusercontent.com/{owner}/{repo}/{branch}/README.md
URL = "https://raw.githubusercontent.com"
OWNER = 'MustafaYasin'
REPO = "MustafaYasin"
BRANCH = "main" 

# Function to download the README.md file from each repository
def get_readme():
    url = URL +'/' + OWNER + '/' + REPO + '/' + BRANCH + '/' + "README.md"
    readme = wget.download(url, out="../user_data_csv/README.md", )

    # Open the downloaded Markdown file and read it into a variable
    # After that, convert the Markdown to HTML
    with open(readme, 'r') as f:
        text = f.read()
        html = markdown(text)
        text = ''.join(BeautifulSoup(html, features="lxml").findAll(text=True))
        new_dict = {}
        new_dict[text] = text.count(text)
        os.remove(readme)


    return new_dict


print(get_readme())



# text, new_dict = get_readme()
# from pprint import pprint
# pprint("nthis is a dicitonary", new_dict)





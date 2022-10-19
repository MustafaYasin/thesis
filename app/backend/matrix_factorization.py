import pandas as pd
import numpy as np

ratings_list = [i.strip().split("::") for i in open('/Users/myasin/Documents/thesis/app/backend/csv_folder/pytorch_pytorch.csv', 'r',).readlines()]

ratings_df = pd.DataFrame(ratings_list, columns = ['repo_count', 'company', 'hireable'], dtype = int)


ratings_df.head()
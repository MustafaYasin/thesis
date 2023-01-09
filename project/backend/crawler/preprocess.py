from pprint import pprint
from nltk.corpus import stopwords
import nltk


# Download the stopwords
nltk.download('stopwords')

# Apply different methods to clean the text e.g. remove appestorph and unnessary signs
def clean_df(df):
    symbols = "!\"#$%&()*+-./:;<=>?@[\]^_`{|}~\n"
    df['READMES'] = df['READMES'].str.replace('[^a-zA-Z0-9]', ' ', regex=True).str.strip()
    df["READMES"] = df["READMES"].apply(str)
    df["READMES"] = df["READMES"].str.replace(r"[\"\',]", '', regex=True)
    df["READMES"] = df["READMES"].apply(lambda x: ''.join(ch for ch in x if ch not in set(symbols)))
    df['READMES'] = df['READMES'].str.replace('\d+', '', regex=True) 
    df['READMES'] = df['READMES'].str.lower()
    df = df.dropna(how='all')
    return df

# Remove punctiation
def remove_punctuation(df):
    df["READMES"] = df['READMES'].str.replace('[^\w\s]','', regex=True)
    return df

# Remvoe all stopwords from the READMES column
def remove_stop_words(df):
    # import the stopwords from the nltk library
    stop_words = stopwords.words('english')
    df["READMES"] = df["READMES"].apply(lambda x: ' '.join([word for word in x.split() if word not in (stop_words)]))
    return df


# Remove all single characters from the READMES column
def remove_single_characters(df):
    df['READMES'] = df['READMES'].str.replace(r'\b\w\b', '', regex=True).str.replace(r'\s+', ' ', regex=True)
    return df


# Call all function to clean and preprosses the READMES
def preprocess(df):
    df = clean_df(df)
    df = remove_stop_words(df)
    df = remove_punctuation(df) 
    df = remove_single_characters(df)
    df = df[df['READMES'].notna()]
    df.to_csv("cleaned_df.csv", index=False)
    return df


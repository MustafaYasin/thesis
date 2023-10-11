from nltk.corpus import stopwords
import nltk
import pandas as pd

# Download stopwords if not already downloaded
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

# Remove special characters from a specified column in the DataFrame
def remove_special_characters(df, column_name='READMES'):
    """Remove special characters from a given DataFrame column."""
    df[column_name] = df[column_name].str.replace('[^a-zA-Z0-9]', ' ', regex=True)
    return df

# Convert text in the specified DataFrame column to lowercase
def to_lowercase(df, column_name='READMES'):
    """Convert all characters in the specified DataFrame column to lowercase."""
    df[column_name] = df[column_name].str.lower()
    return df

# Remove stopwords from the specified DataFrame column
def remove_stop_words(df, column_name='READMES'):
    """Remove stopwords from a given DataFrame column."""
    stop_words = stopwords.words('english')
    df[column_name] = df[column_name].apply(lambda x: ' '.join([word for word in x.split() if word not in stop_words]))
    return df

# Remove single characters from the specified DataFrame column
def remove_single_characters(df, column_name='READMES'):
    """Remove single characters from a given DataFrame column."""
    df[column_name] = df[column_name].str.replace(r'\b\w\b', '', regex=True).str.replace(r'\s+', ' ', regex=True)
    return df

# Main preprocessing function
def preprocess(df, column_name='READMES'):
    """
    Perform text preprocessing on a specified DataFrame column:
    - Remove special characters
    - Convert to lowercase
    - Remove stopwords
    - Remove single characters
    """
    # Validate if the DataFrame has the specified column
    if column_name not in df.columns:
        raise ValueError(f"The DataFrame does not contain a column named {column_name}")

    # Apply preprocessing functions
    df = remove_special_characters(df, column_name)
    df = to_lowercase(df, column_name)
    df = remove_stop_words(df, column_name)
    df = remove_single_characters(df, column_name)

    # Drop rows where the specified column is NA
    df = df[df[column_name].notna()]

    # Save to CSV (Optional: Could be removed to make the function more flexible)
    df.to_csv("cleaned_df.csv", index=False)

    return df

# Sample DataFrame for testing
sample_data = {'READMES': ["This is a sample!", "Another example...", "Final one!"]}
df = pd.DataFrame(sample_data)


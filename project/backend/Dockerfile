FROM python:3.8-slim-buster

# Create app directory
WORKDIR /app

# Install app dependencies
COPY requirements.txt ./
RUN pip install -r requirements.txt

# Bundle app source
COPY . .

# Expose port
EXPOSE 5001

# Run backend
CMD ["python3", "./api/run.py"]
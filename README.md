# README.md

## Overview
This project uses Docker Compose to manage and run a frontend and backend service. The frontend is built with Node.js and the backend is built with Python. 

## Running the Project with Docker-Comppose
1. Make sure that you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed on your system.
2. Navigate to the project's root directory.
3. Run the following command to build and start the services:

```docker-compose up --build```

4. The frontend service will be available at `http://localhost:3000` and the backend service will be available at `http://localhost:5001`.

## Backend
- navigate to backend/api 
- make sure the requirements are installed by running the requirements.txt fine in /project/backend

```pip install -r requirements.txt```

 
- run the backend with
```python3 run.py```

The backend will now run on Port 5001

Dockerfile for Backend
```Dockerfile
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
```


## Frontend
- navigate to frontend folder
- use npm install

to install the required packages

- after install run the frontend with npm start

The frontend will now run on Port 3000

Dockerfile for Frontend
```Dockerfile
FROM node:14-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
RUN npm install

# Bundle app source
COPY . .

# Build app
RUN npm run build

# Expose port
EXPOSE 3000

# Run frontend
CMD ["npm", "start"]
```


Docker Compose File

```version: "3"
services:
  frontend:
    image: my-frontend
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    depends_on:
      - backend
  backend:
    image: my-backend
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5001:5001"
 ```









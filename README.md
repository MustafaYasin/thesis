
# Co-Founder

Co-Founder is a web application that matches potential Co-Founders. It consists of a frontend and a backend service. The frontend is implemented using Node.js, and the backend is built with Python. Docker Compose is used to manage and run these services, making it easy to scale and deploy.

## Prerequisites

Before you begin, please ensure you have installed the following:

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm)
- [Python](https://www.python.org/downloads/) and [pip](https://pip.pypa.io/en/stable/installation/)

## Running the Project

To run the project using Docker Compose, follow these steps:

1. Open a terminal and navigate to the project's root directory.
2. Run the following command to build and start the services:

```shell
docker-compose up --build
```

3. The frontend service will be accessible at `http://localhost:3000` and the backend service will be available at `http://localhost:5001`.

## Backend Service

Here are the steps to run the backend service independently:

1. Navigate to the `backend/api` directory.
2. Install the necessary Python packages by running the following command in the `/project/backend` directory:

```shell
pip install -r requirements.txt
```

3. Start the backend service with:

```shell
python3 run.py
```

The backend service will now run on port 5001.

The Dockerfile for the backend service is:

```Dockerfile
FROM python:3.8-slim-buster
WORKDIR /app
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5001
CMD ["python3", "./api/run.py"]
```

## Frontend Service

Here are the steps to run the frontend service independently:

1. Navigate to the `frontend` folder.
2. Install the necessary Node.js packages with:

```shell
npm install
```

3. After the installation, start the frontend service with:

```shell
npm start
```

The frontend service will now run on port 3000.

The Dockerfile for the frontend service is:

```Dockerfile
FROM node:14-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Docker Compose File

The Docker Compose file defines the services (frontend and backend), their build contexts, Dockerfiles, exposed ports, and dependencies.

```yaml
version: "3"
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

## Contact

For more information or any queries, please contact me at `<hello@mustafayasin.com>`.

## License

This project is licensed under `<MIT License>`.

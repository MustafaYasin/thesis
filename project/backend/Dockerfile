FROM python:3.8

# Create and set working directory
RUN mkdir -p /app
WORKDIR /app

# Install dependencies
COPY **requirements.txt .
RUN pip install -r requirements.txt

# Copy source code
COPY . .

# Expose port and run the application with Gunicorn
EXPOSE 5000
CMD ["python", "./api/run.py"]
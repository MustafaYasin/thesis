FROM node:14

# Create and set working directory
RUN mkdir -p /app
WORKDIR /app

# Install dependencies
COPY **package.json .
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port and run the application
EXPOSE 3000
CMD ["npm", "start"]
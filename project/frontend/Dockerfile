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
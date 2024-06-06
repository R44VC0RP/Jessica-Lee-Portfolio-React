# Fetching the latest node image on alpine linux
FROM node:alpine

# Setting up the work directory
WORKDIR /backend

# Installing dependencies
COPY package.json ./
RUN npm install express mongoose aws-sdk uuid

# Copying all the files in our project
COPY . .

EXPOSE $PORT
CMD ["node", "server.js"]
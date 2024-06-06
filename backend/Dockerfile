# Fetching the latest node image on alpine linux
FROM node:alpine

# Setting up the work directory
WORKDIR /backend

# Installing dependencies
COPY backend/package.json ./
RUN npm install express mongoose aws-sdk uuid

# Copying all the files in our project
COPY backend/ .

EXPOSE $PORT
CMD ["node", "server.js"]
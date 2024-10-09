# Fetching the latest node image on alpine linux
FROM node:16

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY package*.json ./

RUN apt-get update && apt-get install -y \
    libglib2.0-0 \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

RUN npm install

# Copying all the files in our project
COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]


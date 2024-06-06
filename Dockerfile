# Fetching the latest node image on alpine linux
FROM node:alpine AS builder

# Declaring env
ENV NODE_ENV production

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY ./package.json ./
RUN npm install

# Copying all the files in our project
COPY . .

# Building our application
RUN npm run build

# Fetching the latest nginx image
FROM nginx

# Accepting build argument for nginx config
ARG NGINX_CONF=nginx.conf

# Copying built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Copying our nginx.conf
COPY ${NGINX_CONF} /etc/nginx/conf.d/default.conf

# Adding backend service
FROM node:alpine AS backend

WORKDIR /backend

COPY ./backend/package.json ./
RUN npm install express mongoose aws-sdk uuid

COPY ./backend ./

EXPOSE 3000
CMD ["node", "server.js"]
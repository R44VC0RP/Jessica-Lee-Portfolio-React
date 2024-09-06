# Fetching the latest node image on alpine linux
FROM node:alpine AS builder

# Declaring env
ENV NODE_ENV production

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY frontend/package.json ./
RUN npm install

# Copying all the files in our project
COPY frontend/ ./

# Building our application
RUN npm run build

# Fetching the latest nginx image
FROM nginx

ARG NGINX_CONF=nginx.conf

# Copying built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Copying our nginx.conf
COPY frontend/prod-nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE ${PORT}
CMD ["nginx", "-g", "daemon off;"]
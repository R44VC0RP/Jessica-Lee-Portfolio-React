# Stage 1: Build the React app
FROM node:14-alpine AS builder

# Declaring env
ENV NODE_ENV=production

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY frontend/package.json ./
RUN npm install

# Copying all the files in our project
COPY frontend/ ./

# Building our application
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:latest

# Copying built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Copying our nginx.conf
COPY frontend/prod-nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
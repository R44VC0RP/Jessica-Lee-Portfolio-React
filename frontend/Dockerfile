# Stage 1: Build the React app
FROM node:14-alpine AS builder

# Set the working directory
WORKDIR /app

# Install dependencies
COPY ./package.json ./
RUN npm install

# Copy all the files in our project
COPY ./ ./

# Build our application
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:latest

# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Create and write the nginx.conf file
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    location / { \
        root /usr/share/nginx/html; \
        try_files $uri $uri/ /index.html; \
    } \
    location /api/ { \
        proxy_pass http://localhost:3000/; \
        proxy_http_version 1.1; \
        proxy_set_header Upgrade $http_upgrade; \
        proxy_set_header Connection "upgrade"; \
        proxy_set_header Host $host; \
        proxy_cache_bypass $http_upgrade; \
        client_max_body_size 20M; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
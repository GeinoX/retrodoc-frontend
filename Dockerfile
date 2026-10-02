# ============================================================
# Stage 1: Build the React application
# ============================================================
FROM node:24.21.0-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files first
# This allows Docker to cache npm dependencies between builds.
COPY package.json package-lock.json ./

# Install exactly the dependencies specified by package-lock.json
RUN npm ci

# Copy the rest of the React application
COPY . .

# Build the Vite production application
RUN npm run build


# ============================================================
# Stage 2: Serve the React application with Nginx
# ============================================================
FROM nginx:alpine

# Remove Nginx's default website
RUN rm -rf /usr/share/nginx/html/*

# Copy our custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the production React build from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx listens on port 80 inside the container
EXPOSE 80

# Keep Nginx running in the foreground
CMD ["nginx", "-g", "daemon off;"]
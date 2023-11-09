# Use the Nginx image from Docker Hub
FROM nginx:alpine

# Remove the default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy static assets from the local folder to the container
COPY ./ /usr/share/nginx/html
COPY ./ /usr/share/nginx/html/
COPY ./data/ /usr/share/nginx/html/data

# Expose port 80 to the outside once the container has launched
EXPOSE 80

# Start Nginx and keep it running in the foreground
CMD ["nginx", "-g", "daemon off;"]



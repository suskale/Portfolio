# Use an official lightweight nginx image
FROM nginx:stable-alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy site files
COPY index.html /usr/share/nginx/html/index.html
COPY style.css  /usr/share/nginx/html/style.css

# Optional: copy a custom nginx config if you want (not required for this simple site)
# COPY default.conf /etc/nginx/conf.d/default.conf

# Expose web port
EXPOSE 80

# Start nginx (default command is fine)
CMD ["nginx", "-g", "daemon off;"]

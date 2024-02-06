# Use Node.js base image for development
FROM node:20.11-alpine3.19

# Set the working directory
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies and Angular CLI globally
RUN npm install -g @angular/cli && npm install

# Copy the rest of your frontend's source code
COPY . .

# Expose the port the app runs on
EXPOSE 4200

# Command to run the app using Angular CLI
CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]

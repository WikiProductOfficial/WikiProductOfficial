FROM node:20.11-alpine3.19

WORKDIR /frontend

COPY package*.json ./

# Install Angular CLI globally and install npm packages
RUN npm install -g @angular/cli && npm install

COPY . .

# Expose the port your app runs on
EXPOSE 4200

# Command to run the Angular application
CMD ["ng", "serve", "--host", "0.0.0.0"]

FROM node:20.11-alpine3.19

WORKDIR /frontend

COPY package*.json ./

RUN npm install -g @angular/cli && npm install

# RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points

COPY . .

# Change permissions of scripts to ensure they are executable
RUN chmod -R +x /frontend/scripts

# Expose the port your app runs on
EXPOSE 4200

# Add the scripts directory to the PATH for easy execution
ENV PATH="/frontend/scripts:$PATH"


# Command to run the app using run.sh script
CMD ["run.sh"]

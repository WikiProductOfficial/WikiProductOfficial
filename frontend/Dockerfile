FROM node:20.11-alpine3.19

WORKDIR /frontend

COPY package*.json ./

RUN npm install -g @angular/cli && npm install

# RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points

COPY . .

COPY scripts ./scripts

# Make sure the script is executable
RUN chmod +x ./scripts/run.sh

EXPOSE 4200

# Command to run the app using run.sh script
CMD ["./scripts/run.sh"]

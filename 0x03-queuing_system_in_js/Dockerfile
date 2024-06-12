# Use an official Node.js runtime as a parent image
FROM node:12

# Set the working directory
WORKDIR /usr/src/app

# Install nodemon and babel-cli
RUN npm install --save-dev nodemon @babel/cli @babel/preset-env

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run nodemon and babel-node
CMD ["npm", "run", "dev"]

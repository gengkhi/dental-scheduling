# Step 1: Use an official Node.js image as the base image
FROM node:14

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire project to the container (including .env file)
COPY . .

# Step 6: Expose the port the frontend will run on (port 3000 for React)
EXPOSE 3000

# Step 7: Command to run the frontend (usually "npm start" or "npm run dev")
CMD ["npm", "run", "dev"]

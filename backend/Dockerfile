# Use Node.js image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm install

# Copy rest of the backend code
COPY . .

# Expose port
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]

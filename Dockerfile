FROM node:20-alpine

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies safely
RUN npm install

# Copy source code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "start"]

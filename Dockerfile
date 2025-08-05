FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# MOUNTING IT, NO NEED TO Copy source code
# COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]

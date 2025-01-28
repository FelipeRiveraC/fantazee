# Base image
FROM ruby:3.2.2

# Install system dependencies
RUN apt-get update -qq && apt-get install -y \
    build-essential \
    libpq-dev \
    nodejs \
    npm

# Install Node.js and Yarn
RUN npm install -g yarn

# Set working directory
WORKDIR /app

# Install Ruby dependencies
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Install Node dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application
COPY . .

# Add a script to wait for DB
COPY docker-entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"] 

# Set the base image to Node 16
FROM node:18

# Update the repository sources list
RUN apt-get update && apt-get upgrade -y

# Install Chromium
RUN apt-get install -y chromium

# Install dependencies
RUN apt-get install -y gconf-service \
    libasound2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgcc1 \
    libgconf-2-4 \
    libgdk-pixbuf2.0-0 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    ca-certificates \
    fonts-liberation \
    libappindicator1 \
    libnss3 \
    lsb-release \
    xdg-utils \
    wget

# Create the folders for whatsapp bot
RUN mkdir -p /app/.wwebjs_auth
RUN mkdir -p /app/.wwebjs_cache
RUN mkdir -p /app/temp

# Set the working directory to /app
WORKDIR /app

# Bundle the app source inside the docker image
COPY . .

# Set chromium environment variable
ENV PUPPETEER_EXECUTABLE_PATH='/usr/bin/chromium'
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_ARGS='--no-sandbox'

# Set app environment variables
ARG TELEGRAM_TOKEN
ENV TELEGRAM_TOKEN=${TELEGRAM_TOKEN}

ARG TELEGRAM_CHAT_ID
ENV TELEGRAM_CHAT_ID=${TELEGRAM_CHAT_ID}

ARG WHATSAPP_ADMIN
ENV WHATSAPP_ADMIN=${WHATSAPP_ADMIN}

ARG WHATSAPP_FORWARD
ENV WHATSAPP_FORWARD=${WHATSAPP_FORWARD}

# Install all the app npm packages
RUN npm install

# Build the nuxt app
RUN npm run build

# Bind docker deamon to port 8080
EXPOSE 8080

# Start command
CMD [ "node", ".output/server/index.mjs" ]
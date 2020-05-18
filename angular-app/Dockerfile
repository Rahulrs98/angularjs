# Stage 1
# Create image based on the official Node 8 image from dockerhub

FROM node:8.11.2-alpine as node

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory

WORKDIR /usr/src/app

# Copy dependency definitions

COPY package.json /usr/src/app

# Install dependecies
RUN npm cache clean --force
RUN npm config set registry "http://r.cnpmjs.org"
RUN npm cache verify
RUN npm install

# Get all the code needed to run the app

COPY . /usr/src/app 

# Run the angular in product
RUN npm start

# Stage 2
FROM nginx:1.13.12-alpine

#copy dist content to html nginx folder, config nginx to point in index.html
COPY --from=node /usr/src/app/dist/ /usr/share/nginx/html

# COPY ./nginx.conf /etc/nginx/conf.d/default.conf



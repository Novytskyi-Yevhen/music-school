FROM node:14 AS development

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env ./

# RUN npm install glob rimraf

RUN npm install 
RUN npm install bcryptjs

COPY . ./
# COPY [all but **/node_modules/**] ./

# RUN npm run build
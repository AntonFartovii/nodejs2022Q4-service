FROM node:18-alpine
WORKDIR /usr/nodejs2022Q4
COPY package*.json .
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD ["npm", "start"]

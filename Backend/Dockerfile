From node:18

WORKDIR /server

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
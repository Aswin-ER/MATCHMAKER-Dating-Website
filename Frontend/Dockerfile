From node:18.12.1-alpine

WORKDIR src/app

COPY package*.json ./

RUN npm install -g serve

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["serve" , "-s", "build"]
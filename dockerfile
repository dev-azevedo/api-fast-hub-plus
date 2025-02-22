FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install



COPY . .

# Build
RUN npm run build

EXPOSE 3005

CMD [ "npm", "start" ]
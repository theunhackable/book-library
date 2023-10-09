FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN  npm install --production

COPY next.config.js ./next.config.js

COPY app components lib public ./


COPY . .
RUN npm run build

CMD ["npm", "start"]

FROM node:16-alpine3.16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=4002
EXPOSE 4002
RUN npx prisma generate
RUN npm run build
CMD [ "npm","start" ]
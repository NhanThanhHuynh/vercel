FROM node:slim
WORKDIR /usr/src/app
ENV DB_USERNAME=1519132
ENV DB_PASSWORD=1234
ENV accessToken=15191321234xxxx
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 7878
CMD [ "npm", "start" ]

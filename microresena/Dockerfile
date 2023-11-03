FROM node

EXPOSE 3003

WORKDIR /microresena

COPY controllers /microresena/controllers
COPY models /microresena/models
COPY index.js /microresena

RUN npm init --yes
RUN npm install express morgan mysql mysql2 axios

CMD node index.js

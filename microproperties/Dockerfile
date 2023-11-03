FROM node

EXPOSE 4003

WORKDIR /ordenes

COPY controllers /ordenes/controllers
COPY models /ordenes/models
COPY index.js /ordenes

RUN npm init --yes
RUN npm install express morgan mysql mysql2 axios

CMD node index.js
FROM node

EXPOSE 3002

WORKDIR /microproperties

COPY controllers /microproperties/controllers
COPY models /microproperties/models
COPY index.js /microproperties

RUN npm init --yes
RUN npm install express morgan mysql mysql2 axios

CMD node index.js

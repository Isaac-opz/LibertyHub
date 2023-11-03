FROM node

EXPOSE 3001

WORKDIR /microuser

COPY controllers /microuser/controllers
COPY models /microuser/models
COPY index.js /microuser

RUN npm init --yes
RUN npm install express morgan mysql mysql2 axios

CMD node index.js

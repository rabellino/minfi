FROM node:slim

RUN mkdir /client

# Copy client assets
COPY ./client /client

# Run a basic npm install and let it figure out package dependencies
RUN npm install
RUN npm install -D @vitejs/plugin-basic-ssl

# Run a build so the packaged version gets built in the container
RUN npm run build

ENV PORT 443
EXPOSE $PORT

# Run client in development mode
CMD [ "npm", "run", "dev" ]
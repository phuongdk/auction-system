FROM node:19.4.0

ARG VITE_API_URL

WORKDIR /app

COPY ./package.json .
RUN npm install

COPY . .

# Command for local development

# CMD ["npm", "run", "dev"]

# Command for deployment in production

RUN npm run build

CMD [ "npm", "start" ]
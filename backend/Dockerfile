# SETUP NESTJS SERVER IMAGE USING DOCKER MULTI-STAGE BUILD

###################
# LOCAL DEVELOPMENT
###################

FROM node:19.4.0-alpine As development

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

USER node

# Start the server in development mode
# CMD [ "npm", "run", "start:dev" ]

# ######################
# # BUILD FOR PRODUCTION
# ######################

FROM node:19.4.0-alpine As build

WORKDIR /app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm install --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:19.4.0-alpine As production

COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

# Start the server in production mode
CMD [ "node", "dist/main.js" ]
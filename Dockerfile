FROM node:16-slim

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

ENV NODE_ENV=development
# RUN make prepare
# RUN make build

# CMD ["bash", "-c", "make db-migrate && npm start"]

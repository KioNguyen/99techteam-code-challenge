# Build stage
FROM node:18-bullseye AS build

WORKDIR /app
COPY . .

RUN yarn install
RUN yarn build

# Final stage
FROM node:18-bullseye

WORKDIR /app

COPY --from=build /app .
EXPOSE 8000

CMD ["yarn", "start"]

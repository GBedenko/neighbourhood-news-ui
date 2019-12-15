#!/usr/bin/env bash

# Start all the servers for each microservice
node ../neighbourhood-news-articles-and-events/articles-and-events-api.js&
node ../neighbourhood-news-comments/comments-api.js&
node ../neighbourhood-news-ui/index.js&
node ../neighbourhood-news-users/users-api.js&

# Delay for however long user requests
sleep $1

# Kill the microservices processes so that their ports are free for next time
kill %1 %2 %3 %4

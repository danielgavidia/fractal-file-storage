#!/bin/bash
docker rm -vf $(docker ps -aq)
docker rmi -f $(docker images -aq)

docker compose -f "docker-compose.yaml" up -d --build
npx prisma migrate dev

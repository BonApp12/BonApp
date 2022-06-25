#!/bin/bash
#echo "Deploying changes..."

#echo "Stop all container ❌"
#docker-compose stop

#echo "destroying last container instance ... say sayonara👋"
# Suppression des instances
#docker system prune -a -f

#echo "executing git pull 🚣🏼‍"
# Pull changes from the live branch
#git pull

#echo "rebuilding our life ..."

#docker-compose up  -d

echo "listing the .env file 📝"

cat .env
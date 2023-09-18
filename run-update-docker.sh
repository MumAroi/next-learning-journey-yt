#!/usr/bin/env bash

CONTAINER_NAME="next-learning-journey-yt_nextjs_"
# lets find the first container
FIRST_NUM=`docker ps | awk '{print $NF}' | grep $CONTAINER_NAME | awk -F  "_" '{print $NF}' | sort | head -1`
NUM_OF_CONTAINERS=1
MAX_NUM_OF_CONTAINERS=2

docker-compose build nextjs
docker-compose scale nextjs=$MAX_NUM_OF_CONTAINERS

# waiting for new containers
sleep 90

# removing old containers
for ((i=$FIRST_NUM;i<$NUM_OF_CONTAINERS+$FIRST_NUM;i++))
do
  docker stop $CONTAINER_NAME$i
  docker rm $CONTAINER_NAME$i
done

docker-compose scale nextjs=$NUM_OF_CONTAINERS


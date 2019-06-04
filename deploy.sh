#!/bin/bash
  
path="/CAT"


if [ -d $path/project-thundercat ]; then
    cd $path/project-thundercat
    git pull
    docker-compose -f docker-compose-dev.yml down
    docker-compose -f docker-compose-dev.yml rebuild
    docker-compose -f docker-compose-dev.yml up -d
else
    git clone https://github.com/code-for-canada/project-thundercat.git $path/project-thundercat
    cd $path/project-thundercat
    docker-compose -f docker-compose-dev.yml down
    docker-compose -f docker-compose-dev.yml rebuild
    docker-compose -f docker-compose-dev.yml up -d
fi

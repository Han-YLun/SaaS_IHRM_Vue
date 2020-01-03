#!/bin/bash

pwd
ls -la

cnpm i
npm run build

scp -r ./dist/ root@172.17.0.120:/home/saas-hrm-vue/
ssh root@172.17.0.120 'cd /home/saas-hrm-vue && docker-compose down && docker-compose up -d'

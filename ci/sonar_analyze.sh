#!/bin/bash

sonar-scanner \
  -Dsonar.projectKey=gitlab:$CI_COMMIT_REF_NAME:$CI_PROJECT_NAME \
  -Dsonar.projectName=gitlab:$CI_COMMIT_REF_NAME:$CI_PROJECT_NAME \
  -Dsonar.projectVersion=1.0.$CI_PIPELINE_ID 

if [ $? -eq 0 ]; then
    echo "sonarqube code-publish over."
fi
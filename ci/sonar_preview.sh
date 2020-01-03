#!/bin/bash

sonar-scanner -X \
  -Dsonar.analysis.mode=preview \
  -Dsonar.projectKey=gitlab:$CI_COMMIT_REF_NAME:$CI_PROJECT_NAME \
  -Dsonar.projectName=gitlab:$CI_COMMIT_REF_NAME:$CI_PROJECT_NAME \
  -Dsonar.projectVersion=1.0.$CI_PIPELINE_ID \
  -Dsonar.issuesReport.html.enable=true \
  -Dsonar.gitlab.project_id=$CI_PROJECT_ID \
  -Dsonar.gitlab.commit_sha=$CI_COMMIT_SHA \
  -Dsonar.gitlab.ref_name=$CI_COMMIT_REF_NAME

  # -Dsonar.gitlab.ignore_certificate=true \
  # -Dsonar.gitlab.disable_global_comment=true \
  # -Dsonar.gitlab.unique_issue_per_inline=true
  # -Dsonar.gitlab.failure_notification_mode=exit-code
  # -Dsonar.gitlab.commit_sha=$CI_COMMIT_SHA \
  # -Dsonar.gitlab.disable_global_comment=true \
  # -Dsonar.gitlab.unique_issue_per_inline=true \
  # -Dsonar.gitlab.failure_notification_mode=exit-code \
  # -Dsonar.gitlab.only_issue_from_commit_file=false

if [ $? -eq 0 ]; then
    echo "sonarqube code-publish over."
fi
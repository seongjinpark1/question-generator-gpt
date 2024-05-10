#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"
echo "GIT_COMMIT_MESSAGE: $VERCEL_GIT_COMMIT_MESSAGE"

# 테섭 / 본섭 빌드
if ([[ "$VERCEL_GIT_COMMIT_REF" == "develop" ]] && [[ "$VERCEL_GIT_COMMIT_MESSAGE" == *deploy* ]]) || ([[ "$VERCEL_GIT_COMMIT_REF" == "main" ]] && [[ "$VERCEL_GIT_COMMIT_MESSAGE" == *deploy* ]]) ; then
  # Proceed with the build
  echo "✅ - Build can proceed"
  exit 1;

else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi
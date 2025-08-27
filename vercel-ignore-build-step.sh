#!/bin/bash
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"
if [[ "$VERCEL_GIT_COMMIT_REF" == "main" ]]; then
  echo "✅ - Build can proceed for main branch"
  exit 1
else
  echo "🛑 - Build cancelled for non-main branch"
  exit 0
fi
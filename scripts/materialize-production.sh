#!/usr/bin/env bash
set -euo pipefail

deploy_branch="${DEPLOY_BRANCH:-deploy-production}"
source_sha="${SOURCE_SHA:-$(git rev-parse HEAD)}"

if [[ ! -f .gitmodules ]]; then
  echo "error: .gitmodules is missing" >&2
  exit 1
fi

submodule_paths=()
while IFS= read -r path; do
  submodule_paths+=("$path")
done < <(git config --file .gitmodules --get-regexp path | awk '{print $2}')

if [[ "${#submodule_paths[@]}" -eq 0 ]]; then
  echo "error: no submodules found" >&2
  exit 1
fi

git switch -C "$deploy_branch"
for path in "${submodule_paths[@]}"; do
  if [[ ! -d "$path" ]]; then
    echo "error: missing submodule directory: $path" >&2
    exit 1
  fi

  git rm --cached "$path"
  find "$path" -name .git -prune -exec rm -rf {} +
  git add -f "$path"
done
git rm .gitmodules

if git ls-files --stage | awk '$1 == "160000" { found = 1 } END { exit found ? 0 : 1 }'; then
  echo "error: deploy branch still contains gitlinks" >&2
  exit 1
fi

git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git commit \
  -m "deploy: materialize ${source_sha:0:7}" \
  -m "Source: https://github.com/${GITHUB_REPOSITORY:-Midwess/web}/commit/${source_sha}"

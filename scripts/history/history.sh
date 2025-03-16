#!/bin/bash

for dir in */; do
  if [ -d "$dir/.git" ]; then
    echo "----------- commit history for $dir ------------"
    (cd "$dir" && git --no-pager log --pretty=format:"%h / %ad / %s" --date=short)
    echo ""
  fi
done

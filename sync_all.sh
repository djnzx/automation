#!/bin/bash
FILE="repos.txt"

while IFS=$'\t' read -r id url; do
    # Check if the repository folder already exists
    if [ -d "$id" ]; then
        echo "Updating $id..."
        cd "$id" || exit
        git reset --hard
        git pull
        cd ..
    else
        echo "Cloning $id..."
        git clone "$url" "$id"
    fi
done < "$FILE"

echo "done"

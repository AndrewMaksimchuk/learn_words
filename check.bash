#!/usr/bin/env bash

dir=$(dirname $0)

if [[ -z $1 ]]; then
    echo "Add word for search"
    exit
fi

words=$(jq '.[] | "\(.summary): \(.body)"' "$dir/dictionary.json" | grep "$1" | sort | tr -d '"')

if [[ -z $words ]]; then
    echo "Your word \"$1\" not contain in dictionary"
    exit
fi

echo "$words"

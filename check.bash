#!/usr/bin/env bash

dir=$(dirname $0)

function learnwords_add_word_and_open() {
ed -s $dir/words << EOF
0a
$1
.
w
q
EOF

vi +startinsert -c ":normal A  " $dir/words 
}

if [[ -z $1 ]]; then
    echo "Add word for search"
    exit
fi

words=$(jq '.[] | "\(.summary): \(.body)"' "$dir/dictionary.json" | grep "$1" | sort | tr -d '"')

if [[ -z $words ]]; then
    echo "\"$1\" not contain in dictionary"
    read -p "Want to add this word? (y/n): " answer

    if [[ -z "$answer" ]]; then
      exit
    fi

    if [[ "$answer" = 'n' ]]; then
      exit
    fi

    learnwords_add_word_and_open "$1"
    exit
fi

echo "$words"

#!/usr/bin/env bash

projectdir=$(realpath `dirname $0`)

file_name="learnwords.desktop"

file_content="
[Desktop Entry]
Name=Learn words
Type=Application
Comment=Show notification with word translation
Terminal=false
Categories=Education;"

desktop_file="$projectdir/$file_name"

echo "$file_content" > $desktop_file
echo "Exec=$projectdir/learnwords" >> $desktop_file
echo "Icon=$projectdir/learnwords-96.png" >> $desktop_file

desktop-file-install --dir=$HOME/.local/share/applications $desktop_file
update-desktop-database -v ~/.local/share/applications

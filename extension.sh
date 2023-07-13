#!/usr/bin/env sh


# https://github.com/freddez/gnome-shell-simple-message
dconf write /org/gnome/shell/extensions/simple-message/message "\"$1\""

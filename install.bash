#!/usr/bin/env bash


cwd=$(dirname $0)
path=$(readlink -f $cwd)


function addpath() {
    user=$(who -s | head -1 | awk '{print $1}')
    config=$(echo "/home/$user/$1")

    [[ ! -e $config ]] && return 0

    is_set_env=$(cat $config | grep "LEARNWORDS_INSTALL")
    [[ -n $is_set_env ]] && return 0

    echo >> $config
    echo "export LEARNWORDS_INSTALL=\"$path\"" >> $config
    echo 'export PATH="$PATH:$LEARNWORDS_INSTALL"' >> $config
}


function addcompletion() {
    cp -f $cwd/_learnwords_completion /etc/bash_completion.d/

    if [[ -d /usr/share/zsh/vendor-completions/ ]]; then
        cp -f $cwd/_learnwords /usr/share/zsh/vendor-completions/
    fi
}


function gui_build() {
    $(cd $cwd && npm install && npm run tsc) 2>/dev/null
}


addpath ".bashrc"
addpath ".zshrc"


addcompletion


execfiles=$(echo $cwd/*.bash)
chmod +x $execfiles


$cwd/install_desktop_entry.bash
gui_build

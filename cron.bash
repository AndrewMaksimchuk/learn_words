#!/usr/bin/env bash

interval="15"
file="/notify.js"
path=$(pwd)
execfile="$path$file"
cronjob="*/$interval * * * * $execfile"

echo "$cronjob" | crontab
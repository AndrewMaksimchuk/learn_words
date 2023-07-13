#!/usr/bin/env bash

dir=$(dirname $0)
file=$(echo "$dir/notify.js")

while true; do $file; sleep 5m; done

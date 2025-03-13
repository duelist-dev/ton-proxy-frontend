#!/bin/sh

set -e

auto_envsubst() {
  envsubst < "/usr/share/nginx/html/config.js" > "/usr/share/nginx/html/config-docker.js" && mv "/usr/share/nginx/html/config-docker.js" "/usr/share/nginx/html/config.js"
}

auto_envsubst

exit 0

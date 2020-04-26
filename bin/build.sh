#!/bin/sh
yarn
export PATH=$(pwd)/src/scripts:$(pwd)/node_modules/.bin:$PATH

echo $PATH

# speed_test && gatsby build && cp -r ./public/* $DEPLOY_DIR

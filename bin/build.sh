#!/bin/sh
yarn
export PATH=./src/scripts:./node_modules/.bin:$PATH

speed_test && gatsby build && cp -r ./public/* $DEPLOY_DIR

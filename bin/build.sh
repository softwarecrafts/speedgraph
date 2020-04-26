#!/bin/sh

export PATH=./src/scripts:./node_modules/.bin:$PATH

node speed_test.js && gatsby build && cp -r build $DEPLOY_DIR

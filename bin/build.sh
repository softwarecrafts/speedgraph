#!/bin/sh
yarn
export PATH=:./node_modules/.bin:$PATH

node ./src/scripts/speed_test.js && gatsby build && cp -r build $DEPLOY_DIR

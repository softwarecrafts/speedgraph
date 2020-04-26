#!/bin/sh

node ./src/scripts/speed_test.js && gatsby build && cp -r build $DEPLOY_DIR

#!/bin/sh

./src/scripts/speed_test.js && gatsby build && cp -r build $DEPLOY_DIR

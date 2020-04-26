#!/bin/sh
yarn

export PATH="${SRC_DIR}/src/scripts":"${SRC_DIR}/node_modules/.bin":$PATH

echo $PATH

speed_test && gatsby build && cp -r ./public/* $DEPLOY_DIR

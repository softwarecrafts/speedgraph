#!/bin/sh
. ~/.bashrc
yarn

export PATH="${SRC_DIR}/src/scripts":"${SRC_DIR}/node_modules/.bin":$PATH

speed_test && cd ${SRC_DIR} && gatsby build && cp -r ./public/* $DEPLOY_DIR

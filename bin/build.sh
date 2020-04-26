#!/bin/sh
yarn

export PATH=$(realpath '../src/scripts'):$(realpath '../node_modules/.bin'):$PATH

speed_test && gatsby build && cp -r ./public/* $DEPLOY_DIR

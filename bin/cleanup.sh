#!/bin/sh

DAYS_TO_KEEP_DATA=14
DATA_DIR="${SRC_DIR}/data"

DIR_TO_REMOVE=`date --date="${DAYS_TO_KEEP_DATA} days ago" +y-%Y/m-%m/d-%d`

echo "rm -rf ${DATA_DIR}/${DIR_TO_REMOVE}"

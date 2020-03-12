#!/bin/bash

set -e

for i in $(seq 1 100); do
  for j in $(seq 1 100); do
    key=uploads/${i}/test${j}.txt
    echo Uploading ${key}...
    aws s3 cp test.txt s3://s3-trigger-compare/${key}
  done
done

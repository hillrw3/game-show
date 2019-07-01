#!/usr/bin/env bash

set -efux

PORT=3001 BROWSER=none yarn start > /dev/null &

sleep 6

REACT_PID2=$(echo  $(lsof -i :3001 -Fp)[0] | cut -d'p' -f 2 | cut -d' ' -f 1)

npx cypress run

kill $REACT_PID2




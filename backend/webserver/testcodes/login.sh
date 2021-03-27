#!/bin/bash

if [ $# -ne 1 ]
then
  echo "usage: $0 [local|remote]"
  return 1
fi

if [ $1 == 'local' ]
then
  source env_local.txt
else
  source env_remote.txt
fi

echo "####### running login test #######" >> output.txt
status_code=$(curl -i "$URL/api/login" -X POST \
-d '{"userId":"darae","password":"darae12"}' \
-H 'content-type: application/json' \
--write-out "%{http_code}" --silent >> output.txt)
echo >> output.txt

if [[ "$status_code" -eq 200 ]] ; then
	exit 0
else
	exit 1
fi

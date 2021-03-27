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

echo "####### running logout test #######" >> output.txt
status_code=$(curl -i "$URL/api/login" -X POST \
-d '{"userId":"darae","password":"darae12"}' \
-H 'content-type: application/json' \
--cookie-jar .cookies.txt \
--write-out "%{http_code}" --silent >> output.txt)
echo >> output.txt

if [[ "$status_code" -ne 200 ]] ; then
	exit 1
fi

status_code=$(curl -i "$URL/api/logout" -X POST \
-H 'content-type: application/json' \
--cookie .cookies.txt --cookie-jar .cookies.txt \
--write-out "%{http_code}" --silent >> output.txt)
echo >> output.txt

if [[ "$status_code" -ne 200 ]] ; then
	exit 1
fi

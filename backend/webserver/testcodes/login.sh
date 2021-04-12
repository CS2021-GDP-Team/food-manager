#!/bin/bash

if [ $# -ne 1 ]
then
  echo "usage: $0 URL"
  return 1
fi

result=$(curl -i \
"$1/api/login" -X POST \
-d '{"userId":"darae","password":"darae12"}' \
-H 'content-type: application/json' \
--cookie-jar .cookies.txt --silent)
printf "%s\n" "$result" >> .output.txt

status_code=`printf "%s" "$result" | awk 'NR==1 {print $2}'`

if [[ "$status_code" -ne 200 ]] ; then
	exit 1
fi

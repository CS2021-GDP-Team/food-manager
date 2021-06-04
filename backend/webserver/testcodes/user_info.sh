#!/bin/bash

if [ $# -ne 1 ]
then
  echo "usage: $0 URL"
  return 1
fi

# 로그인
result=$(curl -i \
"$1/api/login" -X POST \
-d '{"userId":"barcode","password":"barcode"}' \
-H 'content-type: application/json' \
--cookie-jar .cookies.txt --silent)
printf "%s\n" "$result" >> .output.txt

status_code=`printf "%s" "$result" | awk 'NR==1 {print $2}'`

if [[ "$status_code" -ne 200 ]] ; then
	exit 1
fi

result=$(curl \
"$1/api/user_info" -X GET \
--cookie .cookies.txt --cookie-jar .cookies.txt --silent)
printf "%s\n" "$result" >> .output.txt

result=$(curl -i \
"$1/api/user_info" -X POST \
-d '{"height":170, "weight":70, "isNotified":0, "notifyTime":"19:00"}' \
-H 'content-type: application/json' \
--cookie .cookies.txt --cookie-jar .cookies.txt --silent)
printf "%s\n" "$result" >> .output.txt

status_code=`printf "%s" "$result" | awk 'NR==1 {print $2}'`

if [[ "$status_code" -ne 200 ]] ; then
    exit 1
fi

result=$(curl -i \
"$1/api/user_info" -X POST \
-d '{"height":171}' \
-H 'content-type: application/json' \
--cookie .cookies.txt --cookie-jar .cookies.txt --silent)
printf "%s\n" "$result" >> .output.txt

status_code=`printf "%s" "$result" | awk 'NR==1 {print $2}'`

if [[ "$status_code" -ne 200 ]] ; then
    exit 1
fi

result=$(curl -i \
"$1/api/user_info" -X GET \
--cookie .cookies.txt --cookie-jar .cookies.txt --silent)
printf "%s\n" "$result" >> .output.txt

status_code=`printf "%s" "$result" | awk 'NR==1 {print $2}'`

if [[ "$status_code" -ne 200 ]] ; then
	exit 1
fi
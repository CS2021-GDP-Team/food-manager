#!/bin/bash

if [ $# -ne 1 ]
then
  echo "usage: $0 URL"
  return 1
fi

# 회원가입
result=$(curl -i \
"$1/api/user" -X POST \
-d '{"userId":"jaeho","password":"jaeho12"}' \
-H 'content-type: application/json' \
--silent)
printf "%s\n" "$result" >> .output.txt

status_code=`printf "%s" "$result" | awk 'NR==1 {print $2}'`

if [[ "$status_code" -ne 200 ]] ; then
	exit 1
fi

# 로그인
result=$(curl -i \
"$1/api/login" -X POST \
-d '{"userId":"jaeho","password":"jaeho12"}' \
-H 'content-type: application/json' \
--cookie-jar .cookies.txt --silent)
printf "%s\n" "$result" >> .output.txt

status_code=`printf "%s" "$result" | awk 'NR==1 {print $2}'`

if [[ "$status_code" -ne 200 ]] ; then
	exit 1
fi

# 회원탈퇴
result=$(curl -i \
"$1/api/user" -X DELETE \
--cookie .cookies.txt --cookie-jar .cookies.txt --silent)
printf "%s\n" "$result" >> .output.txt

status_code=`printf "%s" "$result" | awk 'NR==1 {print $2}'`

if [[ "$status_code" -ne 200 ]] ; then
	exit 1
fi

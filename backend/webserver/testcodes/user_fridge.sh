#!/bin/bash

if [ $# -ne 1 ]
then
  echo "usage: $0 URL"
  return 1
fi

# 로그인
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

result=$(curl \
"$1/api/user_fridge" -X GET \
--cookie .cookies.txt --cookie-jar .cookies.txt --silent)
printf "%s\n" "$result" >> .output.txt

ids=(""$(echo "$result" | jq -r ".[].id")"")

for i in ${ids[@]}
do
	result=$(curl -i \
	"$1/api/user_fridge" -X PUT \
	-d "{\"id\":$i, \"expireDate\":0}" \
	-H 'content-type: application/json' \
	--cookie .cookies.txt --cookie-jar .cookies.txt --silent)
	printf "%s\n" "$result" >> .output.txt

	status_code=`printf "%s" "$result" | awk 'NR==1 {print $2}'`

	if [[ "$status_code" -ne 200 ]] ; then
		exit 1
	fi

	result=$(curl -i \
	"$1/api/user_fridge" -X DELETE \
	-d "{\"id\":$i}" \
	-H 'content-type: application/json' \
	--cookie .cookies.txt --cookie-jar .cookies.txt --silent)
	printf "%s\n" "$result" >> .output.txt

	status_code=`printf "%s" "$result" | awk 'NR==1 {print $2}'`

	if [[ "$status_code" -ne 200 ]] ; then
		exit 1
	fi
done

result=$(curl -i \
"$1/api/user_fridge" -X GET \
--cookie .cookies.txt --cookie-jar .cookies.txt --silent)
printf "%s\n" "$result" >> .output.txt

status_code=`printf "%s" "$result" | awk 'NR==1 {print $2}'`

if [[ "$status_code" -ne 200 ]] ; then
	exit 1
fi

result=$(curl -i \
"$1/api/user_fridge" -X POST \
-d '{"ingredientName":"풋사과"}' \
-H 'content-type: application/json' \
--cookie .cookies.txt --cookie-jar .cookies.txt --silent)
printf "%s\n" "$result" >> .output.txt

status_code=`printf "%s" "$result" | awk 'NR==1 {print $2}'`

if [[ "$status_code" -ne 200 ]] ; then
	exit 1
fi

result=$(curl -i \
"$1/api/user_fridge" -X GET \
--cookie .cookies.txt --cookie-jar .cookies.txt --silent)
printf "%s\n" "$result" >> .output.txt

status_code=`printf "%s" "$result" | awk 'NR==1 {print $2}'`

if [[ "$status_code" -ne 200 ]] ; then
	exit 1
fi
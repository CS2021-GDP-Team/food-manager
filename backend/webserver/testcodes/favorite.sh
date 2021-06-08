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
"$1/api/favorite" -X GET \
--cookie .cookies.txt --cookie-jar .cookies.txt --silent)
printf "%s\n" "$result" >> .output.txt

if [[ $(echo "$result" | jq length) > 0 ]] ; then
	recipeIds=(""$(echo "$result" | jq -r '.[].recipe_id')"")
	for i in ${recipeIds[@]}
	do
		result=$(curl -i \
		"$1/api/favorite" -X DELETE \
		-d "{\"recipeId\":$i}" \
		-H 'content-type: application/json' \
		--cookie .cookies.txt --cookie-jar .cookies.txt --silent)
		printf "%s\n" "$result" >> .output.txt
	done
fi

result=$(curl -i \
"$1/api/favorite" -X POST \
-d "{\"recipeId\":25,\"score\":1}" \
-H 'content-type: application/json' \
--cookie .cookies.txt --cookie-jar .cookies.txt --silent)
printf "%s\n" "$result" >> .output.txt

status_code=`printf "%s" "$result" | awk 'NR==1 {print $2}'`

if [[ "$status_code" -ne 200 ]] ; then
	exit 1
fi

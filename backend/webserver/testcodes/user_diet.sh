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


result=$(curl -i \
"$1/api/user_diet" -X POST \
-d '{"recipeId":24}' \
-H 'content-type: application/json' \
--cookie .cookies.txt --cookie-jar .cookies.txt --silent)
printf "%s\n" "$result" >> .output.txt

status_code=`printf "%s" "$result" | awk 'NR==1 {print $2}'`

if [[ "$status_code" -ne 200 ]] ; then
	exit 1
fi

result=$(curl \
"$1/api/user_diet" -X GET \
--cookie .cookies.txt --cookie-jar .cookies.txt --silent)
printf "%s\n" "$result" >> .output.txt

dietIds=(""$(echo "$result" | jq -r '.[].id')"")

result=$(curl -i \
"$1/api/user_diet" -X PUT \
-d "{\"dietId\":${dietIds[0]},\"putDate\":0}" \
-H 'content-type: application/json' \
--cookie .cookies.txt --cookie-jar .cookies.txt --silent)
printf "%s\n" "$result" >> .output.txt

status_code=`printf "%s" "$result" | awk 'NR==1 {print $2}'`

if [[ "$status_code" -ne 200 ]] ; then
	exit 1
fi

for i in ${dietIds[@]}
do
	result=$(curl -i \
	"$1/api/user_diet" -X DELETE \
	-d "{\"dietId\":$i}" \
	-H 'content-type: application/json' \
	--cookie .cookies.txt --cookie-jar .cookies.txt --silent)
	printf "%s\n" "$result" >> .output.txt
done

status_code=`printf "%s" "$result" | awk 'NR==1 {print $2}'`

if [[ "$status_code" -ne 200 ]] ; then
	exit 1
fi

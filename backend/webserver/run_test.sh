#! /bin/bash
if [ $# -ne 1 ]
then
  echo "usage: $0 [local|remote]"
  exit 0
fi

if [[ $1 == 'local' ]] ; then
	URL="http://localhost:3001"
else
	URL="https://jeto.ga/food-manager"
fi

rm .output.txt 2>/dev/null
rm .cookies.txt 2>/dev/null

all_count=0
pass_count=0

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUELK='\033[38;5;69m'
NC='\033[0m' # No Color

function runcode(){
  all_count=$((all_count+1))
  printf "$all_count ${BLUELK}RUNNING${NC}\t$1 $2\n" | tee -a .output.txt
  bash "$1" "$2"
  if [[ $? -eq 0 ]] ; then
    pass_count=$((pass_count+1))
    printf "$all_count ${GREEN}PASSED${NC}\t$1\n" | tee -a .output.txt
  else
    printf "$all_count ${RED}FAILED${NC}\t$1\n" | tee -a .output.txt
  fi
  echo >> .output.txt
}

####################
# Add testcodes here
runcode ./testcodes/login.sh "$URL"
runcode ./testcodes/logout.sh "$URL"
####################

printf "${GREEN}passes${NC}/all : ${GREEN}$pass_count${NC}/$all_count\n" | tee -a .output.txt
printf "All tests are done. You can see outputs by '${BLUELK}cat .output.txt${NC}'\n"
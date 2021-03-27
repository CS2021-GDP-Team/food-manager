#! /bin/bash
if [ $# -ne 1 ]
then
  echo "usage: $0 [local|remote]"
  return 1
fi

rm ./testcodes/output.txt
rm ./testcodes/.cookies.txt

all_count=0
pass_count=0

function runcode(){
  all_count=$((all_count+1))
  bash "$1" "$2"
  local result=$?
  if [[ result -eq 1 ]] ; then
    pass_count=$((pass_count+1))
    echo "$1 passed"
  else
    echo "$1 failed"
  fi
}

runcode ./testcodes/login.sh "$1"
runcode ./testcodes/logout.sh "$1"

echo "pass count / all tests : $pass_count/$all_count"
echo "All tests are done. You can see outputs by 'cat ./testcodes/output.txt'"
import json, re
from parse import parse

def find(number, items):
	for item in items:
		if item['일련번호'] == number:
			return item

def subs(regstr, target, data):
	count = 0
	for i in range(len(data)):
		found = re.findall(regstr, data[i]['재료정보'])
		if found:
			data[i]['재료정보'] = re.sub(regstr, target, data[i]['재료정보'])
			count += 1
	print(f'{count} items changed from {regstr} to {target}')

def parse_and_split(row):
	names = []
	amounts = []
	ing_amts = row['재료정보'].split(',')
	count = 0
#	print(ing_amts)
	for ing_amt in ing_amts:
		if not ing_amt:
			continue
#		print(f'ing_amt : {ing_amt}')
		found = re.findall('([^\d]+)([\d]+(\.[\d]+)?(g|ml))', ing_amt)
		if not found:
			count += 1
			continue
		if len(found[0]) < 2:
			count += 1
			continue
		ing = found[0][0].strip()
		amt = found[0][1].strip()
		if not ing or not amt:
			count += 1
			continue
		names.append(ing)
		amounts.append(amt)
	if count:
		print(f'{row["일련번호"]}: {count} items in {ing_amts} are not found')
	return {'names':names, 'amounts':amounts, 'error_count':count}

with open('data', 'r') as f:
	data = json.load(f)

with open('data_headers', 'r') as f:
	headers = json.load(f)

subs('\(([^(|^)]*술)\)', '', data)
subs('\(([^(|^)]*컵)\)', '', data)
subs('\(([^(|^)]*알)\)', '', data)
subs('\(([^(|^)]*개)\)', '', data)
subs('\(([^(|^)]*마리)\)', '', data)
subs('\(([^(|^)]*cm)\)', '', data)
subs('\(([^(|^)]*줄기)\)', '', data)
subs('\(([^(|^)]*쪽)\)', '', data)
subs('\(([^(|^)]*장)\)', '', data)
subs('\(([^(|^)]*껍질)\)', '', data)
subs('\(([^(|^)]*잎)\)', '', data)
subs('\(([^(|^)]*모)\)', '', data)
subs('\(([^(|^)]*공기)\)', '', data)
subs('기호에따라', ' 0g', data)
subs('포도씨유, 12g', '포도씨유 12g', data)
subs('다진 ', '다진', data)
subs('다진', '다진 ', data)
subs('약간', ' 0g', data)
subs('적당량', ' 0g', data)
subs('ghen', '호두', data)
subs('㎖', 'ml', data)

subs('\( *([\d]+(\.[\d]+)?) *g *\)', ' \\1g', data)
subs('\( *([\d]+(\.[\d]+)?) *ml *\)', ' \\1ml', data)
subs('\(([^\d]*), *([\d]*g)\)', ' \\1 \\2', data)

subs('-', ',', data)
subs('[^,|^g|^l|^\n]*:', ',', data) # 콜론 제거
subs('\n', ',', data)
subs('\[(.*)\]', ', ', data)

'''
for i in range(0, len(data), 10):
	print(data[i]['일련번호'])
	print(data[i]['재료정보'])
'''

normal = 0
errors = 0

result_list = []
for item in data:
	result = parse_and_split(item)
	result_list.append({'name':item['메뉴명'], 'recipe_ingredients':result})
	if result['error_count'] == 0:
		normal += 1
	else:
		errors += 1
print(f'normal : {normal}, errors : {errors}')
#	print(f'{item["일련번호"]} {parse_and_split(item)}')
#print(f'{item["일련번호"]} {parse_and_split(item)}')

with open('result', 'w') as f:
	f.write(json.dumps(result_list))

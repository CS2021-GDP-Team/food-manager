const APIError = require('../exceptions/apierror.js');
const sc = require('../enums/httpstatuscode.js');

class Util{};

Util.validate = (object, items)=>{
	for(var i=0; i<items.length; i++){
		if(Util.isEmpty(object[items[i]])){
			throw new APIError(sc.HTTP_BAD_REQUEST, `${items[i]} 가 필요합니다`);
		}
	}
};

Util.isEmpty = (item)=>{
	return typeof(item) == 'undefined' || item == null || item == '';
};

Object.freeze(Util);

module.exports = Util;

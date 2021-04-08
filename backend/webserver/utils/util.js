const APIError = require('../exceptions/apierror.js');
const sc = require('../enums/httpstatuscode.js');

class Util {}

Util.validate = (object, items) => {
    for (let i = 0; i < items.length; i++) {
        if (Util.isEmpty(object[items[i]])) {
            throw new APIError(sc.HTTP_BAD_REQUEST, `${items[i]} 가 필요합니다`);
        }
    }
};

Util.isEmpty = (item) => {
    if (typeof (item) == 'undefined') return true;
	if (item == null) return true;
	if (Array.isArray(item)) return !item.length;
	if (item === '') return true;
	return false;
};

Object.freeze(Util);

module.exports = Util;

class APIError extends Error{
	constructor(status, message) {
		super();
		this.status = status;
		this.message = message;
	}
}

Object.freeze(APIError);

module.exports = APIError;

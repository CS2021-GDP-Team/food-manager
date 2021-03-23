class HttpStatusCode {};
HttpStatusCode.HTTP_OK = 200;
HttpStatusCode.HTTP_BAD_REQUEST = 400;
HttpStatusCode.HTTP_UNAUTHORIZED = 401;
HttpStatusCode.HTTP_INTERNAL_SERVER_ERROR = 500;
HttpStatusCode.HTTP_NOT_IMPLEMENTED = 501;

Object.freeze(HttpStatusCode);
module.exports = HttpStatusCode;

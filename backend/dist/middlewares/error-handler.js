"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var custom_error_1 = require("../errors/custom-error");
var http_status_codes_1 = require("http-status-codes");
var errorHandler = function (err, req, res, next) {
    if (err instanceof custom_error_1.CustomError) {
        if (err.statusCode === http_status_codes_1.StatusCodes.BAD_REQUEST) {
            console.warn(JSON.stringify(err.serializeErrors()), null, 2);
        }
        return res.status(err.statusCode).send(err.serializeErrors());
    }
    console.error(JSON.stringify({ msg: err.message, name: err.name, stack: err.stack }));
    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send([{ message: 'something went wrong' }]);
};
exports.errorHandler = errorHandler;

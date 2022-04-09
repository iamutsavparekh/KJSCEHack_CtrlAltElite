"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidator = exports.updateUserHandler = void 0;
var express_validator_1 = require("express-validator");
var http_status_codes_1 = require("http-status-codes");
var bcrypt_1 = __importDefault(require("bcrypt"));
var bad_request_error_1 = require("../../errors/bad-request-error");
var not_authorized_error_1 = require("../../errors/not-authorized-error");
var bad_words_1 = __importDefault(require("bad-words"));
var filter = new bad_words_1.default();
var handler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, firstName, lastName, username, newPassword, oldPassword, existingUser, isMatch, userJwt;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, firstName = _a.firstName, lastName = _a.lastName, username = _a.username, newPassword = _a.newPassword, oldPassword = _a.oldPassword;
                existingUser = req.currentUser;
                if (!existingUser) {
                    throw new not_authorized_error_1.NotAuthorizedError();
                }
                if (email) {
                    existingUser.set("validatedEmail", false);
                    existingUser.set("email", email);
                }
                if (firstName)
                    existingUser.set("firstName", firstName);
                if (lastName)
                    existingUser.set("lastName", lastName);
                if (username)
                    existingUser.set("username", username);
                if (!newPassword) return [3 /*break*/, 2];
                if (!oldPassword)
                    throw new bad_request_error_1.BadRequestError('Your old password was entered incorrectly');
                return [4 /*yield*/, bcrypt_1.default.compare(existingUser.password || '', oldPassword)];
            case 1:
                isMatch = _b.sent();
                if (!isMatch)
                    throw new bad_request_error_1.BadRequestError('Your old password was entered incorrectly');
                existingUser.set("password", newPassword);
                _b.label = 2;
            case 2: return [4 /*yield*/, existingUser.save()];
            case 3:
                _b.sent();
                if (!newPassword) return [3 /*break*/, 5];
                return [4 /*yield*/, existingUser.generateAuthToken()];
            case 4:
                userJwt = _b.sent();
                _b.label = 5;
            case 5:
                res.status(http_status_codes_1.StatusCodes.OK).send(__assign(__assign({}, existingUser.toJSON()), { token: userJwt }) || null);
                return [2 /*return*/];
        }
    });
}); };
exports.updateUserHandler = handler;
var validator = [
    (0, express_validator_1.check)('email')
        .isEmpty().withMessage("can't change primary email"),
    (0, express_validator_1.check)('firstName')
        .trim()
        .optional()
        .custom(function (data) { return !filter.isProfane(data); })
        .isLength({ min: 1, max: 50 }).withMessage('firstName can only have alphabets'),
    (0, express_validator_1.check)('lastName')
        .trim()
        .optional()
        .custom(function (data) { return !filter.isProfane(data); })
        .isLength({ min: 1, max: 50 }).withMessage('lastName can only have alphabets'),
    (0, express_validator_1.check)('username')
        .trim()
        .optional()
        .custom(function (data) { return !filter.isProfane(data); })
        .isLength({ min: 1, max: 50 }).withMessage('lastName can only have alphabets'),
    (0, express_validator_1.check)('newPassword')
        .optional()
        .isLength({ min: 7, max: 30 })
        .not()
        .contains('password')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/)
        .withMessage('Your password does not match the password rules '),
    (0, express_validator_1.check)('oldPassword')
        // if the new password is provided...
        // OR
        .if((0, express_validator_1.check)('newPassword').exists())
        // ...then the old password must be too...
        .notEmpty()
        // ...and they must not be equal.
        .custom(function (value, _a) {
        var req = _a.req;
        return value !== req.body.newPassword;
    }).withMessage("Old password can't be equal to new password"),
];
exports.updateUserValidator = validator;

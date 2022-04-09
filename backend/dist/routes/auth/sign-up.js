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
exports.signUpValidator = exports.signUpHandler = void 0;
var express_validator_1 = require("express-validator");
var http_status_codes_1 = require("http-status-codes");
var bad_words_1 = __importDefault(require("bad-words"));
var filter = new bad_words_1.default();
var bad_request_error_1 = require("../../errors/bad-request-error");
var user_1 = require("../../models/user");
var user_activity_1 = require("../../models/user-activity");
var user_notification_1 = require("../../models/user-notification");
var handler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, firstName, lastName, username, password, location, existingUser, existingUsername, user, userActivity, userNotification, userJwt;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, firstName = _a.firstName, lastName = _a.lastName, username = _a.username, password = _a.password, location = _a.location;
                return [4 /*yield*/, user_1.User.findOne({ email: email })];
            case 1:
                existingUser = _b.sent();
                return [4 /*yield*/, user_1.User.findOne({ username: username })];
            case 2:
                existingUsername = _b.sent();
                if (existingUser) {
                    throw new bad_request_error_1.BadRequestError('Email already in use');
                }
                if (existingUsername) {
                    throw new bad_request_error_1.BadRequestError('username already in use');
                }
                user = user_1.User.build({
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    username: username
                });
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                userActivity = user_activity_1.UserActivity.build({
                    userId: user._id,
                    comments: [],
                    likes: []
                });
                return [4 /*yield*/, userActivity.save()];
            case 4:
                _b.sent();
                userNotification = user_notification_1.UserNotification.build({
                    userId: user._id,
                    notifications: []
                });
                return [4 /*yield*/, userNotification.save()
                    //generate jwt
                ];
            case 5:
                _b.sent();
                return [4 /*yield*/, user.generateAuthToken()];
            case 6:
                userJwt = _b.sent();
                res.status(http_status_codes_1.StatusCodes.CREATED).send(__assign(__assign({}, user.toJSON()), { token: userJwt }));
                return [2 /*return*/];
        }
    });
}); };
exports.signUpHandler = handler;
var validator = [
    (0, express_validator_1.check)('email')
        .trim()
        .not()
        .isEmpty()
        .isEmail()
        .custom(function (data) { return !filter.isProfane(data); })
        .withMessage('provide a valid email address'),
    (0, express_validator_1.check)('firstName')
        .trim()
        .not()
        .isEmpty()
        .custom(function (data) { return !filter.isProfane(data); })
        .isLength({ min: 1, max: 50 }),
    (0, express_validator_1.check)('lastName')
        .trim()
        .not()
        .isEmpty()
        .custom(function (data) { return !filter.isProfane(data); })
        .isLength({ min: 1, max: 50 }),
    (0, express_validator_1.check)('password')
        .not()
        .isEmpty()
        .isLength({ min: 7, max: 30 })
        .not()
        .contains('password')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/)
        .withMessage('provide a password with 7 letters that does not contain the word password'),
    (0, express_validator_1.check)('username')
        .trim()
        .optional()
        .custom(function (data) { return !filter.isProfane(data); })
        .isLength({ min: 1, max: 50 }).withMessage('lastName can only have alphabets'),
];
exports.signUpValidator = validator;

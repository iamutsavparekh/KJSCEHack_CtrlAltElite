"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeRouter = void 0;
var express_1 = __importDefault(require("express"));
var require_auth_1 = require("../../middlewares/require-auth");
var validate_request_1 = require("../../middlewares/validate-request");
var get_reactions_1 = require("./get-reactions");
var react_image_1 = require("./react-image");
var router = express_1.default.Router();
exports.likeRouter = router;
router.get("/:imageId", require_auth_1.requireAuth, get_reactions_1.getReactionsValidator, validate_request_1.validateRequest, get_reactions_1.getReactionsHandler);
router.post("/react", require_auth_1.requireAuth, react_image_1.reactToImageValidator, validate_request_1.validateRequest, react_image_1.reactToImageHandler);

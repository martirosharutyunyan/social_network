"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenVerify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Sequelize_1 = require("../sql/Sequelize");
exports.TokenVerify = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.TOKENSECRETKEY);
        const userData = yield Sequelize_1.UserDB.isThere(decodedToken.email);
        if (!userData) {
            return 'no user finded';
        }
        const { password } = userData;
        if (password !== decodedToken.password) {
            return 'Password is incorrect';
        }
        return JSON.stringify(decodedToken, null, 2);
    }
    catch (err) {
        return 'please login again';
    }
});
//# sourceMappingURL=TokenVerify.js.map
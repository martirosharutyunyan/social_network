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
exports.Login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Sequelize_1 = require("../sql/Sequelize");
exports.Login = ({ loginEmail, loginPassword }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Sequelize_1.UserDB.isThere(loginEmail);
        if (!user) {
            return "User not finded";
        }
        const { email, surname, name, password } = user;
        let isPasswordTrue = yield bcrypt_1.default.compare(loginPassword, password);
        if (!isPasswordTrue) {
            return "Password is false";
        }
        const token = jsonwebtoken_1.default.sign({ email, surname, name, password }, process.env.TOKENSECRETKEY, {
            expiresIn: "1h",
        });
        return token;
    }
    catch (err) {
        return err;
    }
});
//# sourceMappingURL=Login.js.map
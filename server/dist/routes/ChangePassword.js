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
exports.ChangePassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = require("./nodemailer");
const Sequelize_1 = require("../sql/Sequelize");
class ChangePassword {
    static ChangePassword({ email, oldPassword }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password } = yield Sequelize_1.UserDB.isThere(email);
                const checkPassword = yield bcrypt_1.default.compare(oldPassword, password);
                if (!checkPassword) {
                    return "error password is incorrect";
                }
                const code = `${Math.floor(Math.random() * 100000)}`;
                const hashedCode = yield bcrypt_1.default.hash(code, 10);
                const message = {
                    from: "tahku_ohjluhe@mail.ru",
                    to: email,
                    subject: "Congratulations",
                    text: `this code:${code} if for changing password`,
                };
                nodemailer_1.mailer(message);
                return hashedCode;
            }
            catch (err) {
                return err;
            }
        });
    }
    static SavePassword({ email, code, newPassword, password, verificationCode }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkCode = yield bcrypt_1.default.compare(verificationCode, code);
                if (!checkCode) {
                    return "Code is incorect";
                }
                const HashedNewPassword = yield bcrypt_1.default.hash(newPassword, 10);
                yield Sequelize_1.UserDB.changePassword(HashedNewPassword, email);
                return "Password changed";
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.ChangePassword = ChangePassword;
//# sourceMappingURL=ChangePassword.js.map
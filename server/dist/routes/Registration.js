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
exports.Registration = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = require("./nodemailer");
const Sequelize_1 = require("../sql/Sequelize");
class Registration {
    static SaveUser({ code, name, surname, verificationCode, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let checkCode = yield bcrypt_1.default.compare(verificationCode, code);
                console.log(code, verificationCode);
                if (!checkCode) {
                    return "code is false";
                }
                let hashedPassword = yield bcrypt_1.default.hash(password, 10);
                yield Sequelize_1.UserDB.AddUser(email.toLowerCase(), name, surname, hashedPassword);
                return "User Saved";
            }
            catch (err) {
                return err;
            }
        });
    }
    static CheckUser({ password, email, surname, name }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (name.trim().length === 0 ||
                    surname.trim().length === 0 ||
                    email.trim().length <= 8 ||
                    password.trim().length < 8) {
                    return "the inputs are not filled";
                }
                let checkEmail = yield Sequelize_1.UserDB.isThere(email);
                if (checkEmail !== undefined) {
                    return "this email already in use";
                }
                let code = `${Math.floor(Math.random() * 100000)}`;
                let hash = yield bcrypt_1.default.hash(code, 10);
                const message = {
                    from: "tahku_ohjluhe@mail.ru",
                    to: email,
                    subject: "Congratulations",
                    text: `dzer cody ${code}`,
                };
                console.log(code);
                nodemailer_1.mailer(message);
                return hash;
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.Registration = Registration;
//# sourceMappingURL=Registration.js.map
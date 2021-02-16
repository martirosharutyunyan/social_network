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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDB = void 0;
const postgresDB_1 = require("../model/postgresDB");
class UserDB {
    static isThere(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield postgresDB_1.model.findOne({ where: { email } });
                if (data === null) {
                    return undefined;
                }
                data = data.toJSON();
                return data;
            }
            catch (err) {
                return err;
            }
        });
    }
    static changePassword(password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield postgresDB_1.model.update({ email, password }, { where: { email } });
            }
            catch (err) {
                return err;
            }
        });
    }
    static AddUser(email, name, surname, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                postgresDB_1.model.create({ email, name, surname, password });
            }
            catch (err) {
                return err;
            }
        });
    }
    static getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield postgresDB_1.model.findAll();
                return data;
            }
            catch (err) {
                return err;
            }
        });
    }
    static Delete(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                postgresDB_1.model.destroy({ where: { email } });
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.UserDB = UserDB;
//# sourceMappingURL=Sequelize.js.map
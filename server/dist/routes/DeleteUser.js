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
exports.DeleteUser = void 0;
const Sequelize_1 = require("../sql/Sequelize");
exports.DeleteUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Sequelize_1.UserDB.Delete(email);
        return "User deleted";
    }
    catch (err) {
        return err;
    }
});
//# sourceMappingURL=DeleteUser.js.map
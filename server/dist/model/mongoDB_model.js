"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    id: Number,
    name: String,
    surname: String,
    email: String,
    password: String,
});
exports.User = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=mongoDB_model.js.map
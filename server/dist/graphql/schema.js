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
exports.schema = void 0;
const graphql_1 = require("graphql");
const ChangePassword_1 = require("../routes/ChangePassword");
const DeleteUser_1 = require("../routes/DeleteUser");
const Login_1 = require("../routes/Login");
const Registration_1 = require("../routes/Registration");
const TokenVerify_1 = require("../routes/TokenVerify");
const Sequelize_1 = require("../sql/Sequelize");
const user = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        email: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        surname: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString }
    })
});
const query = new graphql_1.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        getUsers: {
            type: new graphql_1.GraphQLList(user),
            resolve(parents, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    let data = yield Sequelize_1.UserDB.getUsers();
                    return data;
                });
            }
        },
        checkUser: {
            type: graphql_1.GraphQLString,
            args: { email: { type: graphql_1.GraphQLString }, name: { type: graphql_1.GraphQLString }, surname: { type: graphql_1.GraphQLString }, password: { type: graphql_1.GraphQLString }, },
            resolve(parents, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    let data = yield Registration_1.Registration.CheckUser(args);
                    return data;
                });
            }
        },
        Login: {
            type: graphql_1.GraphQLString,
            args: { loginEmail: { type: graphql_1.GraphQLString }, loginPassword: { type: graphql_1.GraphQLString }, },
            resolve(parents, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield Login_1.Login(args);
                });
            }
        },
        ChangePassword: {
            type: graphql_1.GraphQLString,
            args: { oldPassword: { type: graphql_1.GraphQLString }, email: { type: graphql_1.GraphQLString }, },
            resolve(parents, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield ChangePassword_1.ChangePassword.ChangePassword(args);
                });
            }
        },
        TokenVerify: {
            type: graphql_1.GraphQLString,
            args: { token: { type: graphql_1.GraphQLString }, },
            resolve(parents, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield TokenVerify_1.TokenVerify(args.token);
                });
            }
        }
    })
});
const mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        SaveUser: {
            type: graphql_1.GraphQLString,
            args: { verificationCode: { type: graphql_1.GraphQLString }, code: { type: graphql_1.GraphQLString }, email: { type: graphql_1.GraphQLString }, name: { type: graphql_1.GraphQLString }, surname: { type: graphql_1.GraphQLString }, password: { type: graphql_1.GraphQLString } },
            resolve(parents, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield Registration_1.Registration.SaveUser(args);
                });
            }
        },
        ChangePasswordSave: {
            type: graphql_1.GraphQLString,
            args: { code: { type: graphql_1.GraphQLString }, verificationCode: { type: graphql_1.GraphQLString }, newPassword: { type: graphql_1.GraphQLString }, email: { type: graphql_1.GraphQLString }, },
            resolve(parents, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield ChangePassword_1.ChangePassword.SavePassword(args);
                });
            }
        },
        DeleteUser: {
            type: graphql_1.GraphQLString,
            args: { email: { type: graphql_1.GraphQLString }, },
            resolve(parents, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield DeleteUser_1.DeleteUser(args.email);
                });
            }
        }
    })
});
exports.schema = new graphql_1.GraphQLSchema({
    query,
    mutation,
});
//# sourceMappingURL=schema.js.map
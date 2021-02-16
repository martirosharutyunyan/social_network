"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.model = exports.sequelize = exports.client = void 0;
const pg_1 = require("pg");
const sequelize_1 = require("sequelize");
exports.client = new pg_1.Client({
    database: process.env.postgresDBname,
    password: process.env.postgresDBpassword,
    port: 5432,
    host: '127.0.0.1',
    user: 'postgres',
});
exports.sequelize = new sequelize_1.Sequelize(process.env.POSTGRESDBNAME, 'postgres', process.env.POSTGRESDBPASSWORD, {
    host: '127.0.0.1',
    dialect: 'postgres'
});
exports.model = exports.sequelize.define('users', {
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    surname: {
        type: sequelize_1.DataTypes.STRING
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    }
});
//# sourceMappingURL=postgresDB.js.map
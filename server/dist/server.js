"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./graphql/schema");
const postgresDB_1 = require("./model/postgresDB");
const Socket_io_1 = require("./Socket/Socket.io");
const app = express_1.default();
const port = process.env.PORT;
const http = require('http').createServer(app);
exports.io = require('socket.io')(http, {
    cors: { origin: "*" }
});
postgresDB_1.sequelize.authenticate().then(res => console.log('connected to DB')).catch(err => err ? console.log(err) : null);
app.use(cors_1.default());
app.use(morgan_1.default(`dev`));
app.use('/graphql', express_graphql_1.graphqlHTTP({
    schema: schema_1.schema,
    graphiql: true,
}));
exports.io.on('connection', Socket_io_1.connection);
http.listen(port, () => console.log(`server is runing on port ${port}`));
//# sourceMappingURL=server.js.map
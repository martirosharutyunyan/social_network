import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './graphql/schema';
import { Socket } from "socket.io";
import { sequelize } from "./model/postgresDB";
import { connection } from "./Socket/Socket.io";
const app = express();
const port: number | string = process.env.PORT;
const http = require('http').createServer(app);
export const io:Socket = require('socket.io')(http, { cors: {origin: "*"}});

sequelize.authenticate().then(res => console.log('connected to DB'), console.log)

app.use(cors())
app.use(morgan(`dev`));
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}))



io.on('connection', connection)



http.listen(port, () => console.log(`server is runing on port ${port}`));

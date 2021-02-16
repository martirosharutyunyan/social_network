"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iosocket = void 0;
const server_1 = require("./../server");
let connections = [];
exports.iosocket = (socket) => {
    try {
        const user = {
            // @ts-ignore
            email: socket.request._query.auth,
            id: socket.id
        };
        connections = [...connections, user];
        console.log(`user ${user.email} connected`);
        socket.on('chat message', ({ email, message }) => {
            // @ts-ignore
            const data = connections.find(elem => elem.email === email);
            server_1.io.to(data.id).emit('chat message', message);
            console.log(data, message);
        });
        socket.on('disconnect', () => {
            connections = connections.filter(elem => elem.email !== user.email);
            console.log(`user ${user.email} disconnected`);
        });
    }
    catch (err) {
        console.log(err);
    }
};
//# sourceMappingURL=Socket.io.js.map
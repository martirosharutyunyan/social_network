import { io } from './../server';
import { Socket } from "socket.io"

let connections = []
export const connection = (socket: Socket) => {
    try {
        const user = {
            // @ts-ignore
            email:socket.request._query.auth,
            id:socket.id
        }
        connections = [...connections, user]
        console.log(`user ${user.email} connected`)
        socket.on('chat message', ({ email, message }) => {
            // @ts-ignore
            const data = connections.find(elem => elem.email === email)
            io.to(data.id).emit('chat message', message)
            console.log(data, message)
        })
        socket.on('disconnect', () => {
            connections = connections.filter(elem=>elem.email !== user.email)
            console.log(`user ${user.email} disconnected`)
        })
    } catch(err) {
        console.log(err)
    }
}
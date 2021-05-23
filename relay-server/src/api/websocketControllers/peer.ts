import { Socket } from "socket.io";
import { nanoid } from 'nanoid';
import {verify, sign} from 'jsonwebtoken';
import config from '../../config';

const cache = {}
const basicErrorMessage = "you have not been accepted to the room";
// { [roomCode]: { ownerSocketID: "", connectedUsers: []}}

export default (socket: Socket) => {
  // comes from room owner
  socket.on("room:create", (data: any) => {
    const responseData = { roomCode: nanoid() }
    cache[responseData.roomCode] = { ownerSocketID: socket.id, connectedUsers: [socket.id], connectingUsers: [] }
    socket.join(responseData.roomCode);
    socket.emit('room:newID', responseData);
  });

  // comes from another peer
  socket.on("room:join", function(data: any) {
    const cacheData = cache[data.roomCode]

    if (cacheData) {
      cacheData.connectingUsers.push(socket.id)
      const token = sign({ firstName: 'Test', id: socket.id }, config.api.jwtSecret);// - sign user data
      socket.to(cacheData.ownerSocketID).emit('room:join:request', token)
    }
  });

  // comes from room owner
  socket.on("room:join:request:answer", (data: any) => {
    const cacheData = cache[data.roomCode]
    const token: any = verify(data.token, config.api.jwtSecret)

    if (!cacheData || !token || typeof token === "string" || !token.id) {
      return socket.emit('error', basicErrorMessage)
    }

    const allowedToAccept = cacheData.ownerSocketID === socket.id
    const connectTrue = cacheData.connectingUsers.find(d => d === token.id)

    if (!connectTrue || !allowedToAccept) {
      return socket.emit('error', basicErrorMessage)
    }

    cacheData.connectingUsers = cacheData.connectingUsers.filter(d => d !== connectTrue)
    cacheData.connectedUsers.push(connectTrue)
    socket.to(connectTrue).emit('room:signal', data.signal)
  })

  // comes from anyone
  socket.on("room:stream:create", function(data: any) {
    console.log('GOT STREAM', data)
    const cacheData = cache[data.roomCode];

    if (!cacheData) {
      return socket.emit('error', basicErrorMessage)
    }

    const connectTrue = cacheData.connectedUsers.find(d => d === socket.id);

    if (!connectTrue) {
      return socket.emit('error', basicErrorMessage)
    }

    socket.broadcast.to(data.roomCode).emit('room:signal', data.signal)
  });

  // comes from another peer
  socket.on("room:join:answer", function(data: any) {
    const cacheData = cache[data.roomCode];

    if (!cacheData) {
      return socket.emit('error', basicErrorMessage)
    }

    const connectTrue = cacheData.connectedUsers.find(d => d === socket.id);

    if (!connectTrue) {
      return socket.emit('error', basicErrorMessage)
    }

    socket.join(data.roomCode);
    socket.to(cacheData.ownerSocketID).emit('room:signal', data.signal)
  });
};

import { nanoid } from 'nanoid';
import { ExtSocket } from "src/models/socket";

const cache = {}
const basicErrorMessage = "you have not been accepted to the room";
// { [roomCode]: { ownerSocketID: "", connectedUsers: []}}

export default (socket: ExtSocket) => {
  // comes from room owner
  socket.on("room:create", (data: any) => {
    console.log(socket.auth)
    const responseData = { roomCode: nanoid() }
    cache[responseData.roomCode] = { ownerSocketID: socket.id, connectedUsers: [socket.id], connectingUsers: [] }

    socket.join(responseData.roomCode);

    socket.emit('room:newID', responseData);
  });

  // comes from another peer
  socket.on("room:join", function (data: any) {
    const cacheData = cache[data.roomCode]

    if (cacheData) {
      cacheData.connectingUsers.push(socket.id)

      socket.to(cacheData.ownerSocketID).emit('room:join:request', { id: socket.id })
    }
  });

  // comes from room owner - sends offer signal
  socket.on("room:join:request:answer", async (data: any) => {
    const cacheData = cache[data.roomCode]

    if (!cacheData) {
      return socket.emit('error', basicErrorMessage)
    }

    const allowedToAccept = cacheData.ownerSocketID === socket.id
    const connectTrue = cacheData.connectingUsers.find(d => d === data.token.id)

    if (!connectTrue || !allowedToAccept) {
      return socket.emit('error', basicErrorMessage)
    }

    cacheData.connectingUsers = cacheData.connectingUsers.filter(d => d !== connectTrue)
    cacheData.connectedUsers.push(connectTrue)

    // filter out own socket.id and the room owners id
    const connectedUsers = [...(await socket.in(data.roomCode).allSockets()).values()].filter(d => d !== socket.id && d !== connectTrue);

    const user = {
      id: socket.id,
      full_name: '',
      first_name: '',
      last_name: '',
    }

    if (socket.auth && socket.auth.id) {
      user.full_name = socket.auth.full_name;
      user.first_name = socket.auth.first_name;
      user.last_name = socket.auth.last_name;
    }

    socket.to(connectTrue).emit('room:join:request:answer', { id: socket.id, signal: data.signal, connectedUsers, user })
  })

  // comes from anyone
  socket.on("room:stream:create", function (data: any) {
    const cacheData = cache[data.roomCode];

    if (!cacheData) {
      return socket.emit('error', basicErrorMessage)
    }

    const connectTrue = cacheData.connectedUsers.find(d => d === socket.id);

    if (!connectTrue) {
      return socket.emit('error', basicErrorMessage)
    }

    const sendTo = cacheData.connectedUsers.find(d => d === data.token.id)

    socket.join(data.roomCode);

    const user = {
      id: socket.id,
      full_name: '',
      first_name: '',
      last_name: '',
    }

    if (socket.auth && socket.auth.id) {
      user.full_name = socket.auth.full_name;
      user.first_name = socket.auth.first_name;
      user.last_name = socket.auth.last_name;
    }

    socket.broadcast.to(sendTo).emit('room:signal', { signal: data.signal, id: socket.id, user })
  });

  // comes from another peer
  socket.on("room:join:answer", function (data: any) {
    const cacheData = cache[data.roomCode];

    if (!cacheData) {
      return socket.emit('error', basicErrorMessage)
    }

    const connectTrue = cacheData.connectedUsers.find(d => d === socket.id);

    if (!connectTrue) {
      return socket.emit('error', basicErrorMessage)
    }

    socket.to(cacheData.ownerSocketID).emit('room:signal', data.signal)
  });

  // comes from anyone
  socket.on("room:log:in", function (data: any) {
    const cacheData = cache[data.roomCode];

    if (!cacheData) {
      return socket.emit('error', basicErrorMessage)
    }

    const connectTrue = cacheData.connectedUsers.find(d => d === socket.id);

    if (!connectTrue) {
      return socket.emit('error', basicErrorMessage)
    }

    const user = {
      id: socket.id,
      full_name: '',
      first_name: '',
      last_name: '',
    }

    if (socket.auth && socket.auth.id) {
      user.full_name = socket.auth.full_name;
      user.first_name = socket.auth.first_name;
      user.last_name = socket.auth.last_name;
    }

    socket.broadcast.to(data.roomCode).emit('room:logged:in', { signal: data.signal, id: socket.id, user })
  });
};

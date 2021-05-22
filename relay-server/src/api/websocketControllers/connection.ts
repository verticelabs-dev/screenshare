import { Socket } from "socket.io";
import { nanoid } from 'nanoid'

const cache = {}
// { [roomCode]: { ownerSocketID: "", connectedUsers: [], signal: {}}}

export default (socket: Socket) => {
  console.log("a user connected");

  socket.on("room:create", function(data: any) {
    const responseData = { roomCode: nanoid(), signal: data.signal }
    cache[responseData.roomCode] = { ownerSocketID: socket.id, connectedUsers: [], connectingUsers: [] }
    socket.join(responseData.roomCode);
    socket.emit('room:newID', responseData);
  });

  socket.on("room:join", function(data: any) {
    cache[data.roomCode].connectingUsers.push(socket.id)
    socket.to(cache[data.roomCode].ownerSocketID).emit('room:join:request', { firstName: 'Test', id: socket.id })// - emit user data
    // socket.emit('room:signal', cache[data.roomCode].signal)
  });

  socket.on("room:join:request:answer", (data: any) => {
    let connectTrue = cache[data.roomCode].connectingUsers.find(d => d === data.id)
    if (connectTrue) {
      socket.to(connectTrue).emit('room:signal', data.signal)
    }
  })

  socket.on("room:stream:create", function(data: any) {
    console.log('I GOT THE STREAM')
    socket.to(data.roomCode).emit('room:signal', data.signal)
  });

  socket.on("room:join:answer", function(data: any) {
    socket.join(data.roomCode);
    socket.to(cache[data.roomCode].ownerSocketID).emit('room:signal', data.signal)
  });

  socket.on("disconnect", (reason) => {
    console.log(reason);
  });
};

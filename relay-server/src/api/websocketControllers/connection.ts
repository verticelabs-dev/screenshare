import { Socket } from "socket.io";
import { nanoid } from 'nanoid'

const cache = {}
// { [roomCode]: { ownerSocketID: "", connectedUsers: [], signal: {}}}

export default (socket: Socket) => {
  console.log("a user connected");

  socket.on("room:create", function(data: any) {
    const responseData = { roomCode: nanoid(), signal: data.signal }
    cache[responseData.roomCode] = { ownerSocketID: socket.id, connectedUsers: [], signal: data.signal }
    socket.emit('room:newID', responseData)
  });

  socket.on("room:join", function(data: any) {
    socket.emit('room:signal', cache[data.roomCode].signal)
  });

  socket.on("room:join:answer", function(data: any) {
    // cache[data.roomCode].ownerSocketID
    // socket.to('/#'+cache[data.roomCode].ownerSocketID)
    socket.broadcast.emit('room:signal', data.signal)
  });

  socket.on("disconnect", (reason) => {
    console.log(reason);
  });
};

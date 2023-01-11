import { Server, Socket } from "socket.io";
import connection from './connection';
import peer from './peer';


export default (socketServer: Server) => {
  socketServer.on("connection", (socket: Socket) => {
    connection(socket);
    peer(socket);
  });
}
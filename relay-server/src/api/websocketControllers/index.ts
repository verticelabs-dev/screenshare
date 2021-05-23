import { Server } from "socket.io";
import connection from './connection';
import peer from './peer';
import scale from './scale';

export default (socketServer: Server) => {
  socketServer.on("connection", (socket) => {
    connection(socket);
    peer(socket);
    scale(socket);
  });
}
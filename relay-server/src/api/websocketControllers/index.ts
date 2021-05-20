import { Server } from "socket.io";
import connection from './connection';

export default (socketServer: Server) => {
  socketServer.on("connection", (socket) => {
    connection(socket);
  });
}
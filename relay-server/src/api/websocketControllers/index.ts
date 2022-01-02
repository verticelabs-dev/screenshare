import { Server } from "socket.io";
import connection from './connection';
import { auth } from '@api/middleware'
import peer from './peer';
import { ExtSocket } from "@/types/socket";

export default (socketServer: Server) => {
  socketServer.on("connection", (socket: ExtSocket) => {
    auth.socketHook(socket);
    connection(socket);
    peer(socket);
  });
}
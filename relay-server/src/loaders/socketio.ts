import { Server as socketServer } from "socket.io";
import { Server as httpServerType } from 'http';
import websocketControllers from '@/websocketControllers';

export default ({ httpServer }: { httpServer: httpServerType }) => {

  const io = new socketServer(httpServer, {
    cors: {
      origin: '*',
    }
  });

  websocketControllers(io);

  return io
};

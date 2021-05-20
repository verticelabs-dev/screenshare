import { Socket } from "socket.io";

export default (socket: Socket) => {
  console.log("a user connected");

  socket.on("message", function(message: string) {
    console.log('user msg: ', message);
  });

  socket.on("disconnect", (reason) => {
    console.log(reason);
  });
};

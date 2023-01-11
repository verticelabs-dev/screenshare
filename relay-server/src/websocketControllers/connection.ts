import { Socket } from "socket.io";

export default (socket: Socket) => {
  console.log("a user connected");

  socket.on("disconnect", (reason) => {
    if (reason != "transport close") {
      console.log(reason);
    }
  });
};

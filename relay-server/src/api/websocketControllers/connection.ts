import { ExtSocket } from "src/models/socket";

export default (socket: ExtSocket) => {
  console.log("a user connected");

  socket.on("disconnect", (reason) => {
    if (reason != "transport close") {
      console.log(reason);
    }
  });
};

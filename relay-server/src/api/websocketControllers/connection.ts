import { ExtSocket } from "@/types/socket";

export default (socket: ExtSocket) => {
  console.log("a user connected");

  socket.on("disconnect", (reason) => {
    if (reason != "transport close") {
      console.log(reason);
    }
  });
};

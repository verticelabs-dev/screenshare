import io from "socket.io-client";

const socketServerURL = process.env.VUE_APP_SOCKET_SERVER ?? "localhost:8989";
const socket = io(socketServerURL);

export default socket;

import io from "socket.io-client";

// const socketServerURL = process.env.SOCKET_SERVER ?? "localhost:8989";

const socket = io("tecdrip.com:8989");

export default socket;

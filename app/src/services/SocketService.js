import io from "socket.io-client";

const socketServerURL = process.env.VUE_APP_SOCKET_SERVER ?? "localhost:8989";
const socket = io(socketServerURL);

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const wrapperFunction = (fn) => {
  return function () {
    try {
      if (typeof arguments[1] !== "object") {
        console.error("VALUE MUST BE AN OBJECT");
        return;
      }

      arguments[1].sessionToken = getCookie("sessionToken");

      console.log(arguments[1]);
      fn.apply(this, arguments);
    } catch (ex) {
      console.log("OH NO");
    }
  };
};

socket.emit = wrapperFunction(socket.emit);

export default socket;

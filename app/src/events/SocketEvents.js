import store from "../store/index";
import socket from "../services/SocketService";

function initPeer(initiator, userInfo) {
  store.dispatch("peer/initPeer", { initiator, userInfo });
}

socket.once("room:newID", roomInfo => {
  store.dispatch("peer/setRoomCode", {
    roomCode: roomInfo.roomCode
  });
});

// you have been accepted into the room so start connecting to all the users
socket.on("room:join:request:answer", roomInfo => {
  initPeer(false, roomInfo);

  roomInfo.connectedUsers.forEach(d => {
    initPeer(true, { id: d }); // any connected users
  });
});

// Another user is trying to join the room - auto accept
socket.on("room:join:request", userInfo => {
  userInfo.joinRequest = true;
  initPeer(true, userInfo);
});

socket.on("token", token => {
  console.log("got token", token);
});

socket.on("error", err => {
  console.error(err);
});

// A peer is sending a singal ( We may or may not know about them already )
socket.on("room:signal", signalData => {
  const matchingPeer = store.state.peer.peers.find(
    d => d._peerID === signalData.id
  );

  if (matchingPeer) {
    matchingPeer.signal(signalData.signal);
  } else {
    initPeer(false, {
      id: signalData.id,
      signal: signalData.signal
    });
  }
});

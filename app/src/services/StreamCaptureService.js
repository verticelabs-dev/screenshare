import { groupBy } from "../utils/string";

export function getCaptureScreen(displayMediaOptions) {
  return navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
}

export function getWebcam(displayMediaOptions) {
  return navigator.mediaDevices.getUserMedia(displayMediaOptions);
}

export async function getDevices() {
  let devices = await navigator.mediaDevices.enumerateDevices();

  // Remove this --- Can't see why this would be useful
  devices = devices.filter((device) => {
    return device.deviceId !== "communications";
  });

  const grouped = groupBy(devices, "kind");

  return {
    audioinput: grouped.audioinput,
    audiooutput: grouped.audiooutput,
    videoinput: grouped.videoinput,
  };
}

export async function getAudioInput(deviceId, exact) {
  let audioStream = null;
  let options = { audio: true };

  if (deviceId) options = { audio: { deviceId } };
  else if (deviceId && exact) options = { audio: { exact: { deviceId } } };

  try {
    audioStream = await navigator.mediaDevices.getUserMedia(options);
  } catch (err) {
    console.error("Error: " + err);
  }

  return audioStream;
}

export function stopVideoStream(stream) {
  if (stream)
    stream.getTracks().forEach((track) => {
      if (track.readyState == "live" && track.kind === "video") {
        track.stop();
      }
    });
}

export function checkVideoTrack(stream) {
  if (!stream) {
    return false;
  }

  return stream.getTracks().length > 0;
}

export function displayVideoStream(elementId, stream) {
  const video = document.getElementById(elementId);

  // Stop previous video
  if (checkVideoTrack(video.srcObject)) {
    stopVideoStream(video.srcObject);
  }

  if (!video) {
    return false;
  }

  if ("srcObject" in video) {
    video.srcObject = stream;
  } else {
    console.log("!!! Please consider updating your browser !!!");
    video.src = window.URL.createObjectURL(stream);
  }

  video.play();
}
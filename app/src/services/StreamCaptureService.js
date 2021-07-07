import { groupBy } from "../utils/string";

export async function getCaptureScreen(displayMediaOptions) {
  return navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
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

export function displayVideoStream(elementId, stream) {
  var video = document.getElementById(elementId);

  if ("srcObject" in video) {
    video.srcObject = stream;
  } else {
    video.src = window.URL.createObjectURL(stream);
  }

  video.play();
}

// Attach audio output device to video element using device/sink ID.
export function attachSinkId(element, sinkId) {
  if (typeof element.sinkId !== "undefined") {
    element.setSinkId(sinkId).catch((error) => {
      // could throw it back to default in the settings menu if it fails
      console.error(error);
    });
  } else {
    // Firefox seems to be behind on this :(
    // TODO - hide the option if it
    console.warn("Browser does not support output device selection.");
  }
}

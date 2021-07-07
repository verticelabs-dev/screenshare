export async function getCaptureScreen(displayMediaOptions) {
  let captureStream = null;

  try {
    captureStream = await navigator.mediaDevices.getDisplayMedia(
      displayMediaOptions
    );
  } catch (err) {
    console.error("Error: " + err);
  }

  return captureStream;
}

export async function getAudioInput() {
  let audioStream = null;

  try {
    audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
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

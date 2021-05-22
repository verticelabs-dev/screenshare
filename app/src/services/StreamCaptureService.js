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

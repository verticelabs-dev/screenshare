// Docs: https://google.github.io/mediapipe/solutions/selfie_segmentation.html
// Example: https://codepen.io/mediapipe/pen/wvJyQpq
// Example 2: https://github.com/Volcomix/virtual-background/blob/e9c2aa89418bd22daaf7d31b6ab533948c7b0254/src/pipelines/canvas2d/canvas2dPipeline.ts

// blur webrtc video
export function blurVideo(videoInputElement, canvasOutputElement) {
  const selfieSegmentation = new window.SelfieSegmentation({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation@0.1/${file}`;
    },
  });
  const canvasCtx = canvasOutputElement.getContext("2d");

  selfieSegmentation.setOptions({
    modelSelection: 1,
  });

  selfieSegmentation.onResults((results) =>
    onResults(videoInputElement, canvasOutputElement, canvasCtx, results)
  );

  const camera = new window.Camera(videoInputElement, {
    onFrame: async () => {
      await selfieSegmentation.send({ image: videoInputElement });
    },
    width: 1920,
    height: 1080,
  });

  camera.start();
}

function onResults(videoInputElement, canvasOutputElement, canvasCtx, results) {
  canvasCtx.save();

  // Reset canvas
  canvasCtx.clearRect(
    0,
    0,
    canvasOutputElement.width,
    canvasOutputElement.height
  );

  // Person segmentation
  canvasCtx.drawImage(
    results.segmentationMask,
    0,
    0,
    canvasOutputElement.width,
    canvasOutputElement.height
  );

  // Add person back to video
  canvasCtx.globalCompositeOperation = "source-in";
  canvasCtx.drawImage(
    videoInputElement,
    0,
    0,
    canvasOutputElement.width,
    canvasOutputElement.height
  );

  // Background blur
  canvasCtx.globalCompositeOperation = "destination-over";
  canvasCtx.filter = "blur(40px)"; // FIXME Does not work on Safari --- Allow setting of how much blur to apply
  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasOutputElement.width,
    canvasOutputElement.height
  );

  canvasCtx.restore();
}

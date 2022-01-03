export function checkWebWorkerSupport() {
  if (!window.Worker) {
    return false;
  }

  return true;
}

export function spawnWebWorker(workerPath, workerName, messageHandler) {
  const worker = new Worker(workerPath);

  worker.name = workerName;

  if (messageHandler) {
    worker.onmessage = messageHandler;
  }

  return worker;
}

const contextState = {
  lastIntent: null,
  lastEntity: null,
  lastSection: null,
  lastTimestamp: 0,
};

export function setContext(payload = {}) {
  contextState.lastIntent = payload.lastIntent ?? contextState.lastIntent;
  contextState.lastEntity = payload.lastEntity ?? contextState.lastEntity;
  contextState.lastSection = payload.lastSection ?? contextState.lastSection;
  contextState.lastTimestamp = Date.now();
}

export function getContext() {
  return { ...contextState };
}

export function clearContext() {
  contextState.lastIntent = null;
  contextState.lastEntity = null;
  contextState.lastSection = null;
  contextState.lastTimestamp = 0;
}

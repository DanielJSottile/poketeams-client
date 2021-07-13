let _timeoutId: NodeJS.Timeout;
let _idleCallback: () => void;
let _notIdleEvents = [
  'mousedown',
  'mousemove',
  'keypress',
  'scroll',
  'touchstart',
];
const _FIVE_MINUTES_IN_MS = 300000;

const IdleService = {
  setIdleCallback(idleCallback: () => void) {
    _idleCallback = idleCallback;
  },
  resetIdleTimer(ev: Event) {
    clearTimeout(_timeoutId);
    _timeoutId = setTimeout(_idleCallback, _FIVE_MINUTES_IN_MS);
  },
  registerIdleTimerResets() {
    _notIdleEvents.forEach((event) =>
      document.addEventListener(event, IdleService.resetIdleTimer, true)
    );
  },
  unRegisterIdleResets() {
    clearTimeout(_timeoutId);
    _notIdleEvents.forEach((event) =>
      document.removeEventListener(event, IdleService.resetIdleTimer, true)
    );
  },
};

export default IdleService;

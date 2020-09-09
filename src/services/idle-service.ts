let _timeoutId: NodeJS.Timeout;
let _idleCallback: any;
let _notIdleEvents = [
  'mousedown',
  'mousemove',
  'keypress',
  'scroll',
  'touchstart',
];
const _FIVE_MINUTES_IN_MS = 5 * 60 * 1000;

const IdleService = {
  setIdleCallback(idleCallback: any): void {
    _idleCallback = idleCallback;
  },
  resetIdleTimer(ev: any): void {
    clearTimeout(_timeoutId);
    _timeoutId = setTimeout(_idleCallback, _FIVE_MINUTES_IN_MS);
  },
  registerIdleTimerResets(): void {
    _notIdleEvents.forEach((event) =>
      document.addEventListener(event, IdleService.resetIdleTimer, true)
    );
  },
  unRegisterIdleResets(): void {
    clearTimeout(_timeoutId);
    _notIdleEvents.forEach((event) =>
      document.removeEventListener(event, IdleService.resetIdleTimer, true)
    );
  },
};

export default IdleService;

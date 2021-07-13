import jwtDecode from 'jwt-decode';
import config from '../../config';

let _timeoutId: NodeJS.Timeout;
const _TEN_SECONDS_IN_MS = 10000;

type Payload = {
  exp: number;
};

const TokenService = {
  saveAuthToken(token: string): void {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  },
  getAuthToken(): string | null {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },
  clearAuthToken(): void {
    window.localStorage.removeItem(config.TOKEN_KEY);
  },
  hasAuthToken(): boolean {
    return !!TokenService.getAuthToken();
  },
  parseJwt(jwt: string): any {
    return jwtDecode(jwt);
  },
  parseAuthToken(): Payload | undefined {
    const authToken = TokenService.getAuthToken();
    if (authToken) return TokenService.parseJwt(authToken) as Payload;
    else return undefined;
  },
  _getMsUntilExpiry(payload: Payload | undefined): number {
    return (payload?.exp || 0) * 1000 - Date.now();
  },
  queueCallbackBeforeExpiry(callback: () => void): void {
    const msUntilExpiry = TokenService._getMsUntilExpiry(
      TokenService.parseAuthToken()
    );
    _timeoutId = setTimeout(callback, msUntilExpiry - _TEN_SECONDS_IN_MS);
  },
  clearCallbackBeforeExpiry(): void {
    clearTimeout(_timeoutId);
  },
};

export default TokenService;

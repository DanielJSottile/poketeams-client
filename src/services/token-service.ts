import jwtDecode from 'jwt-decode'
import config from '../config'

let _timeoutId: NodeJS.Timeout;
const _TEN_SECONDS_IN_MS = 10000

const TokenService = {
  saveAuthToken(token: any): void {
    window.localStorage.setItem(config.TOKEN_KEY, token)
  },
  getAuthToken(): string | null {
    return window.localStorage.getItem(config.TOKEN_KEY)
  },
  clearAuthToken(): void {
    window.localStorage.removeItem(config.TOKEN_KEY)
  },
  hasAuthToken(): boolean {
    return !!TokenService.getAuthToken()
  },
  parseJwt(jwt: any): unknown {
    return jwtDecode(jwt)
  },
  parseAuthToken(): unknown {
    const authToken = TokenService.getAuthToken()
    if (authToken)
      return TokenService.parseJwt(authToken)
    else
      return undefined
  },
  _getMsUntilExpiry(payload: any): number {
    return (payload.exp * 1000) - Date.now()
  },
  queueCallbackBeforeExpiry(callback: any): void {
    const msUntilExpiry = TokenService._getMsUntilExpiry(
      TokenService.parseAuthToken()
    )
    _timeoutId = setTimeout(callback, msUntilExpiry - _TEN_SECONDS_IN_MS)
  },
  clearCallbackBeforeExpiry(): void {
    clearTimeout(_timeoutId)
  },
}

export default TokenService
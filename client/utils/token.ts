import { jwtDecode } from 'jwt-decode'
import { parseCookies } from 'nookies'

export const userId = (): string => {
  const token = parseCookies().accessToken
  const decoded: any = jwtDecode(token)
  return decoded.id
}

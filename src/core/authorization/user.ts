import jwksClient from 'jwks-rsa'
import { verifyJWT } from './common/jwt'
import { Request } from 'express'
import { getUserById } from '../helpers/user'
import oauthConfig from '../../config/oauth'

export const verifyAuth = async (req: Request) => {
  const jwks_client = jwksClient({
    cache: true,
    rateLimit: true,
    cacheMaxEntries: 5,
    cacheMaxAge: 10000,
    jwksUri: oauthConfig.JWKS_URI,
  })
  let accessToken = req.cookies.access_token
  if (!accessToken && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ')
    if (parts.length === 2) {
      const scheme = parts[0]
      const credentials = parts[1]
      if (/^Bearer$/i.test(scheme)) {
        accessToken = credentials
      }
    }
  }
  if (!accessToken) {
    return null
  }
  try {
    const payload = await verifyJWT(jwks_client, accessToken)
    return payload
  } catch (e) {
    console.log("#error");
    console.log(e);
    return null
  }
}

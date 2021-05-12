import { JwksClient } from 'jwks-rsa'
import * as jwt from 'jsonwebtoken'
import { Payload } from '../../interfaces/Payload'

export const verifyJWT = async (
  client: JwksClient,
  accessToken: string,
  issuer: string | null = null,
  audience: string | null = null,
) => {
  const kid = getKIDfromAccessToken(accessToken)
  const key = await client.getSigningKeyAsync(kid)
  let payload: Payload
  const options: jwt.VerifyOptions = {
    algorithms: ['RS256'],
    ...(issuer && {
      issuer,
    }),
    ...(audience && {
      audience,
    }),
  }
  payload = jwt.verify(accessToken, key.getPublicKey(), options) as Payload
  return payload
}

export const getKIDfromAccessToken = (accessToken: string) => {
  const tokenSections = accessToken.split('.')
  if (tokenSections.length < 2) {
    throw new Error('requested token is invalid')
  }
  const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8')
  const header = JSON.parse(headerJSON)
  return header.kid
}

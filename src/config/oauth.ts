export default {
  JWKS_URI: String(process.env.OAUTH2_JWKS_URI),
  CLIENT_ID: String(process.env.OAUTH2_CLIENT_ID),
  CLIENT_SECRET: String(process.env.OAUTH2_CLIENT_SECRET),
  AUTH_URL: String(process.env.OAUTH2_AUTH_URL),
  ISSUER: String(process.env.OAUTH2_ISSUER),
  TOKEN_URL: String(process.env.OAUTH2_TOKEN_URL),
  REVOKE_URL: String(process.env.OAUTH2_REVOKE_URL),
  SCOPES: String(process.env.OAUTH2_SCOPES).split(','),
}

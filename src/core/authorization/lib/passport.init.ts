import Axios from 'axios'
import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import { authenticate, PassportStatic } from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as OAuth2Strategy, VerifyCallback } from 'passport-oauth2'
import { JWTScopeStrategy } from './strategies'
import { User } from './user'

type oAuth2Config = {
  clientID: string
  clientSecret: string
  authorizationURL: string
  tokenURL: string
  callbackURL?: string
  scope: Array<string> | string
  revokeRefreshTokenURL: string
  jwksUri: string
  issuer: string
  userProfile?: (
    accessToken: string,
    done: (err?: Error | null, profile?: any) => void,
  ) => void
}

export const initializeOAUTH = (
  passport: PassportStatic,
  OAUTH2_CONFIG: oAuth2Config,
) => {
  // The callback that is invoked when an OAuth provider sends back user
  // information. Normally, you would save the user to the database
  // in this callback and it would be customized for each provider
  const callback = (
    req: any,
    accessToken: string,
    refreshToken: string,
    params: any,
    profile: any,
    cb: Function,
  ) => {
    // console.log("access-token", accessToken);
    // console.log("refresh-token", refreshToken);
    // console.log("profile", profile);
    // console.log("params", params);
    req.session!.accessToken = accessToken
    req.session!.refreshToken = refreshToken
    return cb(null, profile)
  }

  // Adding each OAuth provider's startegy to passport
  // passport.use(new GoogleStrategy(GOOGLE_CONFIG, callback))
  // passport.use(new GithubStrategy(GITHUB_CONFIG, callback));
  const DjangoStrategy = new OAuth2Strategy(
    {
      ...OAUTH2_CONFIG,
      passReqToCallback: true,
    },
    callback,
  )

  const client = jwksClient({
    cache: true,
    rateLimit: true,
    cacheMaxEntries: 5,
    cacheMaxAge: 10000,
    jwksUri: OAUTH2_CONFIG.jwksUri,
  })

  const verifyJWT = async (accessToken: string, callback?: VerifyCallback) => {
    const tokenSections = accessToken.split('.')
    if (tokenSections.length < 2) {
      throw new Error('requested token is invalid')
    }
    const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8')
    const header = JSON.parse(headerJSON)
    const kid = header.kid
    const key = await client.getSigningKeyAsync(kid)
    const signingKey = key.getPublicKey()
    if (callback) {
      return jwt.verify(
        accessToken,
        signingKey,
        {
          algorithms: ['RS256'],
          audience: OAUTH2_CONFIG.clientID,
          issuer: OAUTH2_CONFIG.issuer,
        },
        callback,
      )
    }
    return jwt.verify(accessToken, signingKey, {
      algorithms: ['RS256'],
      audience: OAUTH2_CONFIG.clientID,
      issuer: OAUTH2_CONFIG.issuer,
    })
  }
  DjangoStrategy.userProfile = OAUTH2_CONFIG.userProfile
    ? OAUTH2_CONFIG.userProfile
    : async (accessToken: string, done: Function) => {
        await verifyJWT(accessToken, function (err, payload: any) {
          console.log(payload)

          if (err) done(new Error(err.message))
          const user = new User(payload)
          return done(null, user)
        })
      }
  passport.use(DjangoStrategy)
  passport.use(
    'local',
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      (req, username: string, password: string, done: Function) => {
        const basicAuth = Buffer.from(
          `${OAUTH2_CONFIG.clientID}:${OAUTH2_CONFIG.clientSecret}`,
        ).toString('base64')
        Axios.post(
          OAUTH2_CONFIG.tokenURL,
          {
            username,
            password,
            grant_type: 'password',
            scope: OAUTH2_CONFIG.scope,
          },
          {
            headers: {
              Authorization: `Basic ${basicAuth}`,
            },
          },
        )
          .then((res) => {
            console.log(res.data)
            return done(null, req.user)
          })
          .catch((err) => {
            console.log(err)
            throw Error(err.request.data.message)
          })
      },
    ),
  )
  passport.use(
    'jwt',
    new JWTScopeStrategy(
      {
        passReqToCallback: true,
        jwtFromRequest: function (req) {
          var token = null
          if (req && req.cookies) {
            token = req.cookies['access_token']
          }
          return token
        },
        secretOrKeyProvider: jwksClient.passportJwtSecret({
          cache: true,
          rateLimit: true,
          cacheMaxEntries: 5,
          cacheMaxAge: 10000,
          jwksUri: OAUTH2_CONFIG.jwksUri,
        }),
        audience: OAUTH2_CONFIG.clientID,
        issuer: OAUTH2_CONFIG.issuer,
      },
      (req: any, payload: any, done: Function) => {
        const user = new User(payload)
        if (user.canScope(req.scope)) {
          return done(null, user)
        }
        return done(new Error(`Not allowed scope`))
      },
    ),
  )

  const ssoHandler = (options?: { callbackURL: string }) => async (
    req: any,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.cookies.access_token) {
      const returnTo = req.originalUrl || req.url
      const state = returnTo
        ? Buffer.from(JSON.stringify({ returnTo })).toString('base64')
        : undefined
      return authenticate('oauth2', {
        state,
        ...(options?.callbackURL
          ? {
              callbackURL: options.callbackURL,
            }
          : {}),
        session: false,
      })(req, res, next)
    } else if (req.cookies.access_token && req.cookies.refresh_token) {
      try {
        const decoded = await verifyJWT(req.cookies.access_token)
      } catch (err) {
        try {
          const basicAuth = new Buffer(
            `${OAUTH2_CONFIG.clientID}:${OAUTH2_CONFIG.clientSecret}`,
          ).toString('base64')
          const tokens = (
            await Axios.post(
              OAUTH2_CONFIG.tokenURL,
              {
                grant_type: 'refresh_token',
                refresh_token: req.cookies.refresh_token,
              },
              {
                headers: {
                  Authorization: `Basic ${basicAuth}`,
                },
              },
            )
          ).data
          res.cookie('access_token', tokens.access_token, {
            httpOnly: true,
            secure: false,
          })
        } catch (err2) {
          console.log(err2)
          req.logout()
          res.clearCookie('access_token')
          res.clearCookie('refresh_token')
          req.session.reset()
        }
      }
    }
    return next()
  }
  const authCallback = () => (req: any, res: Response, next: NextFunction) => {
    return authenticate(
      'oauth2',
      { session: false },
      (err: any, user: any, info: any) => {
        if (req.query.error === 'access_denied')
          return res.status(401).json({
            message: 'Access denied!',
          })
        if (err) {
          console.log(err)
          return res.status(err.status).json({
            message: err.message,
          })
        }

        const { state } = req.query
        const { returnTo } = JSON.parse(
          new Buffer(state as string, 'base64').toString(),
        )
        res.cookie('access_token', req.session!.accessToken, {
          httpOnly: true,
        })
        res.cookie('refresh_token', req.session!.refreshToken, {
          httpOnly: true,
        })
        return res.redirect(returnTo)
      },
    )(req, res, next)
  }
  const localLogoutHandler = (returnTo: string = '/') => (
    req: any,
    res: Response,
    next: NextFunction,
  ) => {
    const returnUrl = returnTo ? returnTo : '/'
    req.logout()
    res.clearCookie('access_token')
    res.clearCookie('refresh_token')
    req.session.reset()
    return res.redirect(returnUrl)
  }
  const globalSignoutHandler = (returnTo: string = '/') => async (
    req: any,
    res: Response,
    next: NextFunction,
  ) => {
    if (req.cookies.refresh_token) {
      const basicAuth = Buffer.from(
        `${OAUTH2_CONFIG.clientID}:${OAUTH2_CONFIG.clientSecret}`,
      ).toString('base64')
      try {
        await Axios.post(
          OAUTH2_CONFIG.revokeRefreshTokenURL,
          {
            refresh_token: req.cookies.refresh_token,
          },
          {
            headers: {
              Authorization: `Basic ${basicAuth}`,
            },
          },
        )
        req.logout()
        res.clearCookie('access_token')
        res.clearCookie('refresh_token')
        req.session.reset()
      } catch (err) {
        console.log(err.response)
      }
    }
    return res.redirect(returnTo)
  }
  return {
    ssoHandler,
    authCallback,
    localLogoutHandler,
    globalSignoutHandler,
  }
}

export { User } from './user'

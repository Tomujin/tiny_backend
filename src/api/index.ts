import { packRules } from '@casl/ability/extra'
import session from 'client-sessions'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import errorHandler from 'errorhandler'
import express, { Express, NextFunction, Request, Response } from 'express'
import passport from 'passport'
import path from 'path'
import { getRulesForUser } from '../core/authorization'
import { initializeOAUTH } from '../core/authorization/lib/passport.init'
import oauthConfig from '../config/oauth'

const corsOptions = {
  origin: ['http://localhost:3000', 'http://auth.test'],
  credentials: true,
  exposedHeaders: ['set-cookie'],
}

module.exports = (app: Express) => {
  // Routes
  const router = express.Router()

  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, './views'))
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl.includes('favicon.ico')) {
      return res.status(204).end()
    }
    next()
  })
  app.use(express.static(path.join(__dirname, './public')))
  app.use(express.json())
  app.use(
    express.urlencoded({
      extended: true,
    }),
  )
  app.use(errorHandler())
  app.use(cookieParser())

  app.use(
    session({
      cookieName: 'session',
      secret: process.env.SESSION_SECRET as string,
      cookie: {
        httpOnly: true,
        secure: false,
        // sameSite: "none",
      },
    }),
  )
  // Use the passport package in our application
  app.use(passport.initialize())
  app.use(passport.session())

  app.use((req, res, next) => {
    console.log('# Request recieved on: ', req.url)
    next()
  })

  app.use(cors(corsOptions))

  const {
    ssoHandler,
    authCallback,
    localLogoutHandler,
    globalSignoutHandler,
  } = initializeOAUTH(passport, {
    clientID: oauthConfig.CLIENT_ID,
    clientSecret: oauthConfig.CLIENT_SECRET,
    authorizationURL: oauthConfig.AUTH_URL,
    tokenURL: oauthConfig.TOKEN_URL,
    revokeRefreshTokenURL: oauthConfig.REVOKE_URL,
    scope: oauthConfig.SCOPES,
    issuer: oauthConfig.ISSUER,
    jwksUri: oauthConfig.JWKS_URI,
  })
  router.get('myabilities', async (req: any, res, next) => {
    const rules = await getRulesForUser(req)
    return res.json({
      success: true,
      data: {
        rules: packRules(rules),
      },
    })
  })

  router.get('/', (req: Request, res: Response, next: NextFunction) => {
    return res.send(
      '<a href="/sso/login">Single Sign On</a> <br/> <a href="/protected/example">Protected Example</a>',
    )
  })

  router.get('/protected/example', [
    passport.authenticate('jwt', {
      session: false,
      scope: 'email',
      failureRedirect: '/sso/login',
    }),
    (req: Request, res: Response) => {
      res.send('YEAY! you did it.')
    },
  ])

  router.get(
    '/sso/login',
    ssoHandler({
      callbackURL: 'http://localhost:3030/auth/example/callback',
    }),
    (req: Request, res: Response, next: NextFunction) => {
      return res.render('info')
    },
  )

  router.get('/auth/example/callback', authCallback())

  router.get(
    '/sso/app/login',
    ssoHandler({
      callbackURL: 'ai.tinyapp://login',
    }),
  )

  router.get('/logout', localLogoutHandler('/'))

  router.get('/globalLogout', globalSignoutHandler('/'))

  app.use(router)
}

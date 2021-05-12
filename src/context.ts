import { PrismaClient, User } from '@prisma/client'
import { PubSub } from 'apollo-server-express'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import { Request, Response } from 'express'
import { defineSystemAbilitiesFor } from './core/authorization'
import { verifyAuth } from './core/authorization/user'
import { getUserById } from './core/helpers/user'
import { Payload } from './core/interfaces/Payload'
import { Await } from './core/types/Awaits'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})
const pubsub = new PubSub()

export interface Context {
  prisma: PrismaClient
  req: Request
  res: Response
  pubsub: PubSub
  auth: Payload | null
  loggedUser: User | null
  ability: Await<ReturnType<typeof defineSystemAbilitiesFor>>
}

export async function createContext(ctx: ExpressContext): Promise<Context> {
  const auth = await verifyAuth(ctx.req)
  const loggedUser = auth && (await getUserById(auth.sub))
  const ability = await defineSystemAbilitiesFor(loggedUser)
  return {
    ...ctx,
    prisma: prisma,
    pubsub,
    auth,
    loggedUser,
    ability,
  }
}

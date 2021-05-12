import { Context } from './../context'
import { rule } from 'graphql-shield'
import { AuthenticationError } from 'apollo-server-core'

export const isAuthenticated = rule()(async (parent, args, ctx: Context) => {
  if (!ctx.auth) {
    return new AuthenticationError('Unauthenticated.')
  }
  // At this point, you're guaranteed that you're authenticated so we return true directly.
  return true
})

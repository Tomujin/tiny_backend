import { objectType } from 'nexus'
import {
  arg,
  intArg,
  list,
  mutationType,
  nonNull,
  stringArg,
} from 'nexus'
export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.sub()
    t.model.firstName()
    t.model.lastName()
    t.model.userName()
    t.model.profilePic()
    t.model.email()
    t.model.bio()
    t.model.UserFollow()
    t.model.UserSocialNetwork()
    t.model.Posts()
    t.model.AcceptedByUser()
    t.model.isOnboarded()
  },
  
})

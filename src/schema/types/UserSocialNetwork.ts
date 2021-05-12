import { objectType } from 'nexus'
export const UserSocialNetwork = objectType({
  name: 'UserSocialNetwork',
  definition(t) {
    t.model.id()
    t.model.User()
    t.model.userName()
    t.model.SocialNetwork()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

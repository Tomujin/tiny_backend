import { objectType } from 'nexus'
export const UserBadge = objectType({
  name: 'UserBadge',
  definition(t) {
    t.model.id()
    t.model.User()
    t.model.badgeId()
    t.model.badgeStatusId()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

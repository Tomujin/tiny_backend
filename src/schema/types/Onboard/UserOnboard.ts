import { objectType } from 'nexus'
export const UserOnboard = objectType({
  name: 'UserOnboard',
  definition(t) {
    t.model.id()
    t.model.userId()
    t.model.OnboardType()
    t.model.User()
    t.model.isSeen()
    t.model.isFinish()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

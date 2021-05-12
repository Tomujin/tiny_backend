import { objectType } from 'nexus'
export const UserMomentum = objectType({
  name: 'UserMomentum',
  definition(t) {
    t.model.id()
    t.model.momentDay()
    t.model.madeCount()
    t.model.User()
    t.model.MomentumItem()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

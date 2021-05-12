import { objectType } from 'nexus'
export const MomentumItem = objectType({
  name: 'MomentumItem',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.UserMomentum()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

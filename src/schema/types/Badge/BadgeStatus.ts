import { objectType } from 'nexus'
export const BadgeStatus = objectType({
  name: 'BadgeStatus',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

import { objectType } from 'nexus'
export const BadgeType = objectType({
  name: 'BadgeType',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

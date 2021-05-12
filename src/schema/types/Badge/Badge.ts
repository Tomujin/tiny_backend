import { objectType } from 'nexus'
export const Badge = objectType({
  name: 'Badge',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.logo()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

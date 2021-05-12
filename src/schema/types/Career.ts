import { objectType } from 'nexus'
export const Career = objectType({
  name: 'Career',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

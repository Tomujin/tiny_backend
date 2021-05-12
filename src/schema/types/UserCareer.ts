import { objectType } from 'nexus'
export const UserCareer = objectType({
  name: 'UserCareer',
  definition(t) {
    t.model.id()
    t.model.userId()
    t.model.careerId()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

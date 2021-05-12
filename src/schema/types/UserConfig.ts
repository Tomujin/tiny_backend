import { objectType } from 'nexus'
export const UserConfig = objectType({
  name: 'UserConfig',
  definition(t) {
    t.model.id()
    t.model.userId()
    t.model.instensity()
    t.model.isAllowTerms()
    t.model.isOnNotify()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

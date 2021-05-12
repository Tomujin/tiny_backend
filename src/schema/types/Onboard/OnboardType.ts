import { objectType } from 'nexus'
export const OnboardType = objectType({
  name: 'OnboardType',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.UserOnboard()
    t.model.postType()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
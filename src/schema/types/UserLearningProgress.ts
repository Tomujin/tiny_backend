import { objectType } from 'nexus'
export const UserLearningProgress = objectType({
  name: 'UserLearningProgress',
  definition(t) {
    t.model.id()
    t.model.User()
    t.model.Post()
    t.model.learningObjectId()
    t.model.point()
    t.model.pointType()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

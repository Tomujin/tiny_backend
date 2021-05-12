import { objectType } from 'nexus'
export const UserLearningCurriculum = objectType({
  name: 'UserLearningCurriculum',
  definition(t) {
    t.model.id()
    t.model.User()
    t.model.Curriculum()
    t.model.curriculumId()
    t.model.lastUpdated()
    t.model.isLearned()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

import { objectType } from 'nexus'
export const UserCurriculum = objectType({
  name: 'UserCurriculum',
  definition(t) {
    t.model.id()
    t.model.userId()
    t.model.curriculumId()
    t.model.applyingDate()
    t.model.point()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.UserCurriculumRate()
  },
})

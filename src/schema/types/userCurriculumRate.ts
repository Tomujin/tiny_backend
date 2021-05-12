import { objectType } from 'nexus'
export const UserCurriculumRate = objectType({
  name: 'UserCurriculumRate',
  definition(t) {
    t.model.id()
    t.model.userCurriculumId()
    t.model.curriculumId()
    t.nullable.model.rate()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

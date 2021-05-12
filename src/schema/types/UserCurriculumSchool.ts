import { objectType } from 'nexus'
export const UserCurriculumSchool = objectType({
  name: 'UserCurriculumSchool',
  definition(t) {
    t.model.id()
    t.model.User()
    t.model.CurriculumSchool()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

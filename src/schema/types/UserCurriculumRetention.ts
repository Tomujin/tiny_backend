import { objectType } from 'nexus'
export const UserCurriculumRetention = objectType({
  name: 'UserCurriculumRetention',
  definition(t) {
    t.model.id()
    t.model.User()
    t.model.Post()
    t.model.Curriculum()
    t.model.active()
    t.model.retentionConfigId()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

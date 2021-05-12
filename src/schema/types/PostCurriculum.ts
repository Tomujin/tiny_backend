import { objectType } from 'nexus'

export const PostCurriculum = objectType({
  name: 'PostCurriculum',
  definition(t) {
    t.model.id()
    t.model.Post()
    t.model.Curriculum()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
 
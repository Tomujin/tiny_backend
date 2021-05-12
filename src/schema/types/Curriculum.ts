import { objectType } from 'nexus'
export const Curriculum = objectType({
  name: 'Curriculum',
  definition(t) {
    t.model.id()
    t.model.parentId()
    t.model.subjectId()
    t.model.levelId()
    t.model.name()
    t.model.point()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.ParentCurriculum()
    t.model.CurriculumSchools()
    t.model.CurriculumScores()
    t.model.ChildCurriculums()
  },
})

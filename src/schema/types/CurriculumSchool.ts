import { objectType } from 'nexus'
export const CurriculumSchool = objectType({
  name: 'CurriculumSchool',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.curriculumId()
    t.model.Curriculum()
  },
})

import { objectType } from 'nexus'
export const CurriculumScores = objectType({
  name: 'CurriculumScores',
  definition(t) {
    t.model.id()
    t.model.curriculumId()
    t.model.point()
  },
})

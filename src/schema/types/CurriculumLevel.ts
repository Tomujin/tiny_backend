import { objectType } from 'nexus'
export const CurriculumLevel = objectType({
  name: 'CurriculumLevel',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.level()
    t.model.Curriculum()
  },
})

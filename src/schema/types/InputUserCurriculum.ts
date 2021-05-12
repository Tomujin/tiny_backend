import { inputObjectType, list, stringArg } from 'nexus'
export const InputUserCurriculum = inputObjectType({
  name: 'InputUserCurriculum',
  definition(t) {
    t.string('id')
    t.nonNull.string('userId')
    t.string('curriculumId')
    t.float('point')
    t.string('applyingDate')
    t.field('userCurriculumRates', {
      type: list('InputUserCurriculumRate'),
    })
  },
})

export const InputUserCurriculumRate = inputObjectType({
  name: 'InputUserCurriculumRate',
  definition(t) {
    t.string('id')
    t.nonNull.string('userCurriculumId')
    t.nonNull.string('curriculumId')
    t.float('rate')
  },
})

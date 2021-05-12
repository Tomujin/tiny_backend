import { objectType } from 'nexus'

export const RetentionConfig = objectType({
  name: 'RetentionConfig',
  definition(t) {
    t.model.id()
    t.model.sequence()
    t.model.retentionDay()
    t.model.UserCurriculumRetention()
  },
})

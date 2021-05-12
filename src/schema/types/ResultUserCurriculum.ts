import { enumType } from 'nexus'

export const ResultUserCurriculum = enumType({
  name: 'ResultUserCurriculum',
  members: {
    saved: 'Saved',
    failed: 'Failed',
  },
})

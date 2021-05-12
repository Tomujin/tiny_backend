import { objectType } from 'nexus'

export const SocialNetwork = objectType({
  name: 'SocialNetwork',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.logo()
  },
})
import { objectType } from 'nexus'
export const ReactionTypes = objectType({
  name: 'ReactionTypes',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.iconPath()
    t.model.PostReactions()
    t.model.value()
  },
})

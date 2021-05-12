import { resolve } from 'dns'
import { objectType } from 'nexus'
import { Context } from 'src/context'
export const PostReactions = objectType({
  name: 'PostReactions',
  definition(t) {
    t.model.id()
    t.model.User()
    t.model.userId()
    t.model.Post()
    t.model.postId()
    t.field('ReactionType', {
      type: 'ReactionTypes',
      resolve: async ({ reactionTypeId }, args, { prisma }: Context, info) => {
        const reaction = await prisma.reactionTypes.findUnique({
          where: { id: reactionTypeId },
        })
        return reaction
      },
    })
  },
})

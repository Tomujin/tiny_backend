import { nonNull, objectType, stringArg } from 'nexus'
import { Context } from 'src/context'

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.postType()
    t.model.description()
    t.model.isPublished()
    t.model.publishedDate()
    t.model.User()
    t.model.Passage()
    t.model.Contents()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.PostComments()
    t.model.PostReactions()
    t.model.PostCurriculum()
    t.int('reactionCount', {
      resolve: async ({ id }, args, { prisma }: Context, info) => {
        const comments = await prisma.postReactions.findMany({
          where: { postId: id },
        })
        return comments.length
      },
    })
    t.string('isReacted', {
      args: {
        userId: nonNull(stringArg()),
      },
      resolve: async ({ id }, arg, { prisma }: Context, info) => {
        const reaction = await prisma.postReactions.findFirst({
          where: { postId: id, userId: arg.userId },
        })
        if (reaction == null) return ''
        return reaction.id
      },
    })
    // t.model.UserSavedPosts()
    t.string('userSavedPostId', {
      args: {
        userId: nonNull(stringArg()),
      },
      resolve: async ({ id }, arg, { prisma }: Context, info) => {
        const savedPost = await prisma.userSavedPosts.findFirst({
          where: { postId: id, userId: arg.userId },
        })
        if (savedPost == null) return ''
        return savedPost.id
      },
    })
    t.int('totalCount', {
      resolve: async ({ id }, args, { prisma }: Context, info) => {
        const comments = await prisma.postComments.findMany({
          where: { postId: id },
        })
        return comments.length
      },
    })
  },
})

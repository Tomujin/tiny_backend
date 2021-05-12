import { objectType } from 'nexus'
import { Context } from 'src/context'
export const UserFollow = objectType({
  name: 'UserFollow',
  definition(t) {
    t.model.id()
    t.model.userId()
    t.model.followId()
    t.model.FollowedUser()
    t.model.followDate()
    t.model.isFollow()
    t.model.isBuddy()
    t.model.createdAt()
    t.model.updatedAt()
    t.int('followingCount', {
      resolve: async ({ userId }, args, { prisma }: Context, info) => {
        const followCount = await prisma.userFollow.count({
          where: {
            userId: userId,
            isFollow: true,
          },
        })
        return followCount
      },
    })
    t.int('followerCount',{
      resolve: async ({ userId }, args, { prisma }: Context, info) => {
        const followCount = await prisma.userFollow.count({
          where: {
            followId: userId,
            isFollow: true,
          },
        })
        return followCount
      },
    })
    t.int('buddyCount', {
      resolve: async ({ userId }, args, { prisma }: Context, info) => {
        console.log('userid', userId);
        const buddyCount = await prisma.userFollow.count({
          where: {
            userId: userId,
            isBuddy: true,
          },
        })
        return buddyCount
      },
    })
  },
})

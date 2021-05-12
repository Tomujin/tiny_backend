import { queryType, stringArg } from 'nexus'
import { Context } from '../../context'
export const Query = queryType({
  definition(t) { 
    t.nullable.field('getMe', {
      type: 'User',
      async resolve(source, args, { prisma, loggedUser }: Context, info) {
        
        if (!loggedUser) return null
        return prisma.user.findFirst({
          where: {
            id: loggedUser.id,
          },
        })
      },
    })
    // t.nullable.field('getOnboard', {
    //   type: 'OnboardType',
    //   async resolve(source, args, { prisma, loggedUser }: Context, info) {
    //     // var userOnboards =  prisma.userOnboard.findMany();
    //     // if(userOnboards.length==0)
    //     return  prisma.onboardType.findMany();
    //     // else 
    //     // return  prisma.onboardType.findMany();
    //     // if (!loggedUser) return null
    //     // return prisma.user.findFirst({
    //     //   where: {
    //     //     id: loggedUser.id,
    //     //   },
    //     // })
    //   },
    // })
    t.crud.user()
    t.crud.users({ filtering: true, ordering: true, pagination: true })
    t.crud.posts({ filtering: true, ordering: true, pagination: true })
    t.crud.contents({ filtering: true, ordering: true })
    t.crud.curriculum()
    t.crud.curricula({ filtering: true, ordering: true, pagination: true })
    t.crud.userCurriculum()
    t.crud.userCurricula({ filtering: true })
    t.crud.curriculumSchools()
    t.crud.curriculumSchools({
      filtering: true,
      ordering: true,
      pagination: true,
    })
    t.crud.curriculumSchool()
    t.crud.userCurriculumSchool()
    t.crud.postComments({ filtering: true, ordering: true, pagination: true })
    t.crud.postReactions({ filtering: true })
    t.crud.reactionTypes()
    t.crud.careers()
    t.crud.userFollows()
    t.crud.userFollows({ filtering: true, ordering: true, pagination: true })
    t.crud.userSavedPosts({ filtering: true })
    t.crud.userCurriculumRetention()
    t.crud.userCurriculumRetentions()
    t.crud.stories()
    t.crud.postView()
    t.crud.momentumItems()
    t.crud.feedbacks()
    t.crud.onboardTypes()
    t.crud.onboardTypes({ filtering: true, ordering: true, pagination: true })
    t.nullable.field('getProgress', {
      type: 'Curriculum',
      args: {
        userId: stringArg(),
        curriculumId: stringArg(),
      },

      async resolve(source, args, { prisma }: Context, info) {
        if (!args.curriculumId) return null

        const userLearning = await prisma.userCurriculumRetention.findFirst({
          where: { curriculumId: args.curriculumId, userId: args.userId! },
        })

        const curriculum = await prisma.curriculum.findFirst({
          include: {
            Level: {
              select: { name: true, id: true },
            },
          },
          where: {
            id: args.curriculumId,
          },
        })
        // console.log(curriculum?.Level?.name)
        return curriculum
        // return prisma.user.findFirst({})
      },
    })
  },
})

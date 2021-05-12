import {
  arg,
  intArg,
  list,
  mutationType,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import moment = require('moment-timezone')
import { verifyJWT } from '../../core/authorization/common/jwt'
import oauthConfig from '../../config/oauth'
import jwksClient from 'jwks-rsa'
import { Context } from '../../context'
import { OpenIDStandardClaims } from '../../core/interfaces/OpenID'
import { AuthenticationError } from 'apollo-server-express'
import { Payload } from '../../core/interfaces/Payload'
import { exception } from 'console'
// import { ContentType } from '@prisma/client'
import { InputUserCurriculum } from './InputUserCurriculum'
import { ResultUserCurriculum } from './ResultuserCurriculum'

export const Mutation = mutationType({
  definition(t) {
    t.field('signUpMe', {
      type: 'User',
      args: {
        idToken: nonNull(stringArg()),
      },
      async resolve(_parent, { idToken }, { req, prisma }: Context, info) {
        const jwks_client = jwksClient({
          cache: true,
          rateLimit: true,
          cacheMaxEntries: 5,
          cacheMaxAge: 10000,
          jwksUri: oauthConfig.JWKS_URI,
        })
        try {
          const payloads: OpenIDStandardClaims = await verifyJWT(
            jwks_client,
            idToken,
          )
          const user = prisma.user.upsert({
            where: {
              sub: payloads.sub,
            },
            update: {
              email: payloads.email,
            },
            create: {
              sub: payloads.sub,
              email: String(payloads.email),
              userName: payloads.name,
            },
          })
          return user
        } catch (e) {
          console.log(e)
          throw new AuthenticationError('Unauthenticated.')
        }
      },
    }),
      t.string('saveUserCurriculum', {
        args: {
          inputUserCurriculums: list(InputUserCurriculum!)!,
        },
        resolve: async (_, arg, { prisma }: Context, info) => {
          arg.inputUserCurriculums?.forEach(async (x) => {
            if (x != null) {
              try {
                var a = await prisma.userCurriculumRate.deleteMany({
                  where: { userCurriculumId: x.id ?? 'none' },
                })
                var b = await prisma.userCurriculum.deleteMany({
                  where: { userId: x.userId ?? 'none' },
                })
                console.log('Deleted:', a, b)
                var newUserCurriculum = await prisma.userCurriculum.upsert({
                  create: {
                    point: x.point,
                    userId: x.userId,
                    applyingDate: x.applyingDate,
                    curriculumId: x.curriculumId,
                  },
                  update: {
                    point: x.point,
                    applyingDate: x.applyingDate,
                  },
                  where: {
                    id: x.id ?? 'none',
                  },
                })

                if (
                  x.userCurriculumRates != undefined &&
                  x.userCurriculumRates?.length > 0
                ) {
                  x.userCurriculumRates.forEach(async (rates) => {
                    if (rates != null) {
                      var newUserCurriculumRate = await prisma.userCurriculumRate.upsert(
                        {
                          create: {
                            rate: rates.rate ?? 0,
                            curriculumId: rates.curriculumId,
                            userCurriculumId: newUserCurriculum.id,
                          },
                          update: {
                            rate: rates.rate ?? 0,
                          },
                          where: {
                            id: rates?.id ?? '',
                          },
                        },
                      )
                    }
                  })
                }
              } catch (e) {
                console.log(e)
                throw exception(e)
              }
            }
          })

          return 'Saved'
        },
      })
    // t.string('saveUserMoments', {
    //   args: {
    //     momentumItemId: nonNull(stringArg()),
    //     userId: nonNull(stringArg()),
    //   },
    //   resolve: async (_, arg, { prisma }: Context, info) => {
    //   // var one = await prisma.userMomentum.findFirst({where:{
    //   //   userId:arg.userId,
    //   // }
    //   // })
    //     await prisma.userMomentum.upsert({

    //       create: {
    //         userId: arg.userId,
    //         momentumItemId: arg.momentumItemId,
    //         momentDay:new Date(),
    //         madeCount:0,
    //       },
    //       update: {
    //         madeCount: +1,
    //       },
    //       where: {
    //         // userId: arg.userId??"aaa",
    //        id:arg.userId
    //       },
    //     })
    //   },
    // })
    t.crud.deleteOneUser()
    t.crud.updateOneUser()
    t.crud.createOnePost()
    t.crud.createOneUser()
    t.crud.deleteOnePost()
    t.crud.createOneContent()
    t.crud.createOneContentAnswer()
    t.crud.createOneUserCurriculum()
    t.crud.deleteOneUserCurriculum()
    t.crud.updateOneUserCurriculum()
    t.crud.createOneUserAnswersOnContents()
    t.crud.createOneUserCurriculumSchool()
    t.crud.createOneUserConfig()
    t.crud.updateOneUserConfig()
    t.crud.updateOneUserCurriculum()
    t.crud.createOneUserCareer()
    t.crud.createOneCareer()
    t.crud.createOneUserAnswersOnContents()
    t.crud.createOneUserSavedPosts()
    t.crud.createOnePostComments()
    t.crud.createOnePostReactions()
    t.crud.deleteOnePostReactions()
    t.crud.createOnePostView()
    t.crud.createOneUserMomentum()
    t.crud.createOneSocialNetwork()
    t.crud.createOneFeedback()
    t.crud.createOneOnboardType()
    t.crud.deleteOneUserSavedPosts()
  },
})

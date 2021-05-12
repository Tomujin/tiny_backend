import { PrismaClient, User } from '@prisma/client'
const prisma = new PrismaClient()
export const getUserById = async (sub: string) => {
  return prisma.user.findFirst({
    where: {
      sub: sub,
    },
  })
}

export const getUserRoles = async (id: string) => {
  return prisma.user
    .findUnique({
      where: {
        id,
      },
    })
    .Roles()
}

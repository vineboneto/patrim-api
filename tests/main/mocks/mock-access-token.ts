import env from '@/main/config/env'

import { PrismaClient } from '@prisma/client'
import { sign } from 'jsonwebtoken'
import faker from 'faker'

export const makeAccessToken = async (prismaClient: PrismaClient): Promise<string> => {
  const name = faker.name.findName()
  const email = faker.internet.email()
  const password = faker.internet.password()
  const { id } = await prismaClient.user.create({
    data: {
      name,
      email,
      password
    }
  })
  const accessToken = sign({ id }, env.jwtSecret)
  await prismaClient.user.update({
    where: {
      id
    },
    data: {
      accessToken
    }
  })
  return accessToken
}

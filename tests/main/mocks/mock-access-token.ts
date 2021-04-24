import env from '@/main/config/env'
import { PrismaHelper } from '@/infra/db/postgres-prisma'

import { sign } from 'jsonwebtoken'
import faker from 'faker'

type Model = {
  accessToken: string
  accountId: number
}

export const makeAccessToken = async (): Promise<Model> => {
  const prismaClient = PrismaHelper.getConnection()
  const name = faker.name.findName()
  const email = faker.internet.email()
  const password = faker.internet.password()
  const { id } = await prismaClient.user.create({
    data: {
      name,
      email,
      password,
      role: 'admin'
    }
  })
  const accessToken = sign({ id: id.toString() }, env.jwtSecret)
  await prismaClient.user.update({
    where: {
      id: Number(id)
    },
    data: {
      accessToken
    }
  })
  return {
    accountId: id,
    accessToken: accessToken
  }
}

import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { makeOwner, makeCategory } from '@/tests/infra/db/postgres-prisma/helper'

import { Patrimony } from '@prisma/client'
import faker from 'faker'

export const makePatrimony = async (): Promise<Patrimony> => {
  const prismaClient = PrismaHelper.getConnection()
  const { id: ownerId } = await makeOwner()
  const { id: categoryId } = await makeCategory()
  return await prismaClient.patrimony.create({
    data: {
      brand: faker.random.word(),
      description: faker.random.words(),
      number: faker.datatype.uuid(),
      ownerId,
      categoryId
    }
  })
}

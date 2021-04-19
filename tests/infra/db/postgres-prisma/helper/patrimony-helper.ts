import { SavePatrimony } from '@/domain/usecases'
import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { makeOwner, makeCategory, makePlace } from '@/tests/infra/db/postgres-prisma/helper'

import faker from 'faker'

export const makePatrimony = async (): Promise<SavePatrimony.Model> => {
  const prismaClient = PrismaHelper.getConnection()
  const { id: ownerId } = await makeOwner()
  const { id: categoryId } = await makeCategory()
  const { id: placeId } = await makePlace()
  const patrimony = await prismaClient.patrimony.create({
    data: {
      brand: faker.random.word(),
      description: faker.random.words(),
      number: faker.datatype.uuid(),
      ownerId,
      categoryId,
      placeId
    },
    include: {
      Category: true,
      Owner: true,
      Place: true
    }
  })
  return PrismaHelper.adaptPatrimony(patrimony)
}

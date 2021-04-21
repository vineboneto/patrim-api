import { PatrimonyModel } from '@/domain/models'
import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { makeOwner, makeCategory, makePlace } from '@/tests/infra/db/postgres-prisma/helper'

import faker from 'faker'

export const makePatrimony = async (): Promise<PatrimonyModel> => {
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
      Owner: {
        include: {
          Sector: true
        }
      },
      Place: true
    }
  })
  return PrismaHelper.adaptPatrimony(patrimony)
}

export const findPatrimonyById = async (id: number): Promise<PatrimonyModel> => {
  const prismaClient = PrismaHelper.getConnection()
  const patrimony = await prismaClient.patrimony.findFirst({
    where: {
      id: Number(id)
    },
    include: {
      Category: true,
      Owner: {
        include: {
          Sector: true
        }
      },
      Place: true
    }
  })
  if (!patrimony) {
    return null
  }
  return PrismaHelper.adaptPatrimony(patrimony)
}

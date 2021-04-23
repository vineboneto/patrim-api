import { PatrimonyModel } from '@/domain/models'
import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { makeOwner, makeCategory, makeUser } from '@/tests/infra/db/postgres-prisma/helper'

import faker from 'faker'

export const makePatrimony = async (): Promise<PatrimonyModel> => {
  const prismaClient = PrismaHelper.getConnection()
  const { id: ownerId } = await makeOwner()
  const { id: categoryId } = await makeCategory()
  const { id: userId } = await makeUser()
  const patrimony = await prismaClient.patrimony.create({
    data: {
      brand: faker.random.word(),
      description: faker.random.words(),
      number: faker.datatype.uuid(),
      ownerId,
      categoryId,
      userId
    },
    include: {
      Category: true,
      Owner: {
        include: {
          Sector: true
        }
      }
    }
  })
  return PrismaHelper.adaptPatrimony(patrimony)
}

export const makeManyPatrimonies = async (): Promise<PatrimonyModel[]> => {
  const prismaClient = PrismaHelper.getConnection()
  const patrimoniesArray = await patrimonies()
  await prismaClient.patrimony.createMany({
    data: patrimoniesArray
  })
  const patrimoniesPrisma = await prismaClient.patrimony.findMany({
    include: {
      Category: true,
      Owner: {
        include: {
          Sector: true
        }
      }
    }
  })
  return patrimoniesPrisma.map(patrimony => PrismaHelper.adaptPatrimony(patrimony))
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
      }
    }
  })
  if (!patrimony) {
    return null
  }
  return PrismaHelper.adaptPatrimony(patrimony)
}

const patrimonies = async (): Promise<any> => {
  const { id: ownerId } = await makeOwner()
  const { id: categoryId } = await makeCategory()
  const { id: userId } = await makeUser()
  return [
    {
      brand: faker.random.word(),
      description: faker.random.words(),
      number: '123',
      ownerId,
      categoryId,
      userId
    },
    {
      brand: faker.random.word(),
      description: faker.random.words(),
      number: '456',
      ownerId,
      categoryId,
      userId
    },
    {
      brand: faker.random.word(),
      description: faker.random.words(),
      number: '789',
      ownerId,
      categoryId,
      userId
    }
  ]
}

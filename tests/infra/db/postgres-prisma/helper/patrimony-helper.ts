import { SavePatrimony } from '@/domain/usecases'
import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { makeOwner, makeCategory, makePlace } from '@/tests/infra/db/postgres-prisma/helper'
import { Category, Owner, Patrimony, Place } from '@prisma/client'

import faker from 'faker'

type PatrimonyPrisma = Patrimony & { Category: Category, Owner: Owner, Place: Place }

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
  return adapt(patrimony)
}

const adapt = (patrimony: PatrimonyPrisma): SavePatrimony.Model => {
  return {
    id: patrimony.id,
    number: patrimony.number,
    description: patrimony.description,
    brand: patrimony.brand,
    category: {
      id: patrimony.Category.id,
      name: patrimony.Category.name
    },
    owner: {
      id: patrimony.Owner.id,
      name: patrimony.Owner.name,
      sector: {
        id: patrimony.Owner.id,
        name: patrimony.Owner.name
      }
    },
    place: {
      id: patrimony.Owner.id,
      name: patrimony.Owner.name
    }
  }
}

import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { AddOwnerRepository } from '@/data/protocols'
import { makeSector } from '@/tests/infra/db/postgres-prisma/helper'

import faker from 'faker'
import { Owner } from '@prisma/client'

export const makeOwner = async (owner?: AddOwnerRepository.Params): Promise<Owner> => {
  const prismaClient = PrismaHelper.getConnection()
  if (owner) {
    return await prismaClient.owner.create({
      data: {
        name: owner.name,
        sectorId: Number(owner.sectorId)
      }
    })
  }
  const { id: sectorId } = await makeSector()
  return await prismaClient.owner.create({
    data: {
      name: faker.name.findName(),
      sectorId
    }
  })
}

export const makeManyOwners = async (): Promise<Owner[]> => {
  const prismaClient = PrismaHelper.getConnection()
  const { id: sectorId } = await makeSector()
  const owner = {
    name: faker.name.findName(),
    sectorId
  }
  await prismaClient.owner.createMany({
    data: [
      owner,
      owner,
      owner,
      owner,
      owner,
      owner
    ]
  })
  return prismaClient.owner.findMany()
}

export const findOwnerById = async (id: number): Promise<Owner> => {
  const prismaClient = PrismaHelper.getConnection()
  return await prismaClient.owner.findFirst({
    where: {
      id
    }
  })
}

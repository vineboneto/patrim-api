import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { AddOwnerRepository } from '@/data/protocols'
import { OwnerModel } from '@/domain/models'
import { makeSector } from '@/tests/infra/db/postgres-prisma/helper'

import faker from 'faker'

export const makeOwner = async (owner?: AddOwnerRepository.Params): Promise<OwnerModel> => {
  const prismaClient = PrismaHelper.getConnection()
  let ownerModel: any
  if (owner) {
    ownerModel = await prismaClient.owner.create({
      data: {
        name: owner.name,
        sectorId: Number(owner.sectorId)
      },
      include: {
        Sector: true
      }
    })
  } else {
    const { id: sectorId } = await makeSector()
    ownerModel = await prismaClient.owner.create({
      data: {
        name: faker.name.findName(),
        sectorId
      },
      include: {
        Sector: true
      }
    })
  }
  return PrismaHelper.adaptOwner(ownerModel)
}

export const makeManyOwners = async (): Promise<OwnerModel []> => {
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
  const owners = await prismaClient.owner.findMany({
    include: {
      Sector: true
    }
  })
  return owners.map(owner => PrismaHelper.adaptOwner(owner))
}

export const findOwnerById = async (id: number): Promise<OwnerModel> => {
  const prismaClient = PrismaHelper.getConnection()
  const owner = await prismaClient.owner.findFirst({
    where: {
      id
    },
    include: {
      Sector: true
    }
  })
  if (!owner) {
    return null
  }
  return PrismaHelper.adaptOwner(owner)
}

import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { AddOwnerRepository } from '@/data/protocols'
import { OwnerModel } from '@/domain/models'
import { makeSector, makeUser } from '@/tests/infra/db/postgres-prisma/helper'

import { Sector } from '@prisma/client'
import faker from 'faker'

type Props = {
  id: number
  name: string
  userId: number
  Sector: Sector
}

export const makeOwner = async (owner?: AddOwnerRepository.Params, userId?: any): Promise<Props> => {
  const prismaClient = PrismaHelper.getConnection()
  const ownerModel = await prismaClient.owner.create({
    data: await dataOwner(owner?.name, owner?.sectorId, userId),
    include: { Sector: true }
  })
  return ownerModel
}

export const makeManyOwners = async (): Promise<Props []> => {
  const prismaClient = PrismaHelper.getConnection()
  const params = await dataOwner()
  await prismaClient.owner.createMany({
    data: [
      params,
      params,
      params,
      params,
      params,
      params
    ]
  })
  const owners: any = await prismaClient.owner.findMany({
    include: {
      Sector: true
    }
  })
  return owners
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

const dataOwner = async (name?: string, sectorId?: number, userId?: any): Promise<any> => {
  const { id: accountId } = await makeUser()
  const { id: sectorId_ } = await makeSector(null, accountId)
  return {
    userId: userId || accountId,
    name: name || faker.name.findName(),
    sectorId: sectorId || sectorId_
  }
}

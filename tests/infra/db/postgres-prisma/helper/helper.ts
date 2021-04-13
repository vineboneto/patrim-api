import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { AddOwnerRepository } from '@/data/protocols'
import { mockAddCategoryParams, mockAddSectorParams } from '@/tests/data/mocks'

import { Category, Owner, Sector, User } from '@prisma/client'

export const makeUser = async (user = mockAddAccountParams()): Promise<User> => {
  const prismaClient = PrismaHelper.getConnection()
  return await prismaClient.user.create({
    data: user
  })
}

export const makeCategory = async (category = mockAddCategoryParams()): Promise<Category> => {
  const prismaClient = PrismaHelper.getConnection()
  return await prismaClient.category.create({
    data: category
  })
}

export const makeSector = async (sector = mockAddSectorParams()): Promise<Sector> => {
  const prismaClient = PrismaHelper.getConnection()
  return await prismaClient.sector.create({
    data: sector
  })
}

export const makeOwner = async (owner: AddOwnerRepository.Params): Promise<Owner> => {
  const prismaClient = PrismaHelper.getConnection()
  return await prismaClient.owner.create({
    data: {
      name: owner.name,
      sectorId: Number(owner.sectorId)
    }
  })
}

export const findOwnerById = async (id: number): Promise<Owner> => {
  const prismaClient = PrismaHelper.getConnection()
  return await prismaClient.owner.findFirst({
    where: {
      id
    }
  })
}

export const findCategoryById = async (id: number): Promise<Category> => {
  const prismaClient = PrismaHelper.getConnection()
  return await prismaClient.category.findFirst({
    where: {
      id
    }
  })
}

export const findSectorById = async (id: number): Promise<Sector> => {
  const prismaClient = PrismaHelper.getConnection()
  return await prismaClient.sector.findFirst({
    where: {
      id
    }
  })
}

export const findUserById = async (id: number): Promise<User> => {
  const prismaClient = PrismaHelper.getConnection()
  return await prismaClient.user.findFirst({
    where: {
      id
    }
  })
}

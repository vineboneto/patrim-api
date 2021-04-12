import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { AddPlaceRepository, AddOwnerRepository } from '@/data/protocols'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { mockAddCategoryParams, mockAddSectorParams } from '@/tests/data/mocks'

import { Category, Owner, Place, Sector, User } from '@prisma/client'

export const makeUser = async (user = mockAddAccountParams()): Promise<User> => {
  const prismaClient = PrismaHelper.getConnection()
  return await prismaClient.user.create({
    data: user
  })
}

export const makePlace = async (place: AddPlaceRepository.Params): Promise<Place> => {
  const prismaClient = PrismaHelper.getConnection()
  return await prismaClient.place.create({
    data: {
      name: place.name,
      userId: Number(place.userId) || undefined
    }
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

export const findPlaceById = async (id: number): Promise<Place> => {
  const prismaClient = PrismaHelper.getConnection()
  return await prismaClient.place.findFirst({
    where: {
      id
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

import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { AddPlaceRepository } from '@/data/protocols'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { mockAddCategoryParams, mockAddSectorParams } from '@/tests/data/mocks'

import { Category, Place, Sector, User } from '@prisma/client'

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

export const findPlaceById = async (id: number): Promise<Place> => {
  const prismaClient = PrismaHelper.getConnection()
  return await prismaClient.place.findFirst({
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

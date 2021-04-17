import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { AddPlaceRepository } from '@/data/protocols'
import { mockAddPlaceRepositoryParams } from '@/tests/data/mocks'

import { Place } from '@prisma/client'

export const makePlace = async (place?: AddPlaceRepository.Params): Promise<Place> => {
  const prismaClient = PrismaHelper.getConnection()
  if (place) {
    return await prismaClient.place.create({
      data: place
    })
  }
  return await prismaClient.place.create({
    data: mockAddPlaceRepositoryParams()
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

export const makeManyPlaces = async (): Promise<Place[]> => {
  const prismaClient = PrismaHelper.getConnection()
  await prismaClient.place.createMany({
    data: [
      mockAddPlaceRepositoryParams(),
      mockAddPlaceRepositoryParams(),
      mockAddPlaceRepositoryParams()
    ]
  })
  return prismaClient.place.findMany()
}

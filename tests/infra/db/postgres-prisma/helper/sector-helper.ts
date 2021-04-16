import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { AddSectorRepository } from '@/data/protocols'
import { mockAddSectorRepositoryParams } from '@/tests/data/mocks'

import { Sector } from '@prisma/client'

export const makeSector = async (sector?: AddSectorRepository.Params): Promise<Sector> => {
  const prismaClient = PrismaHelper.getConnection()
  if (sector) {
    return await prismaClient.sector.create({ data: sector })
  }
  return await prismaClient.sector.create({
    data: mockAddSectorRepositoryParams()
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

export const makeManySectors = async (): Promise<Sector[]> => {
  const prismaClient = PrismaHelper.getConnection()
  await prismaClient.sector.createMany({
    data: [
      mockAddSectorRepositoryParams(),
      mockAddSectorRepositoryParams(),
      mockAddSectorRepositoryParams()
    ]
  })
  return prismaClient.owner.findMany()
}

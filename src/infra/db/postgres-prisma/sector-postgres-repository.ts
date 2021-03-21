import { AddSectorRepository } from '@/data/protocols'
import { PrismaHelper } from '@/infra/db/postgres-prisma/prisma-helper'

export class SectorPostgresRepository implements AddSectorRepository {
  async addSector (sector: AddSectorRepository.Params): Promise<AddSectorRepository.Result> {
    const { name } = sector
    const prismaClient = await PrismaHelper.getConnection()
    const sectorResult = await prismaClient.sector.create({
      data: {
        name
      }
    })
    return sectorResult !== null
  }
}

import { PrismaClient } from '@prisma/client'
import { AddSectorRepository } from '@/data/protocols'

export class SectorPostgresRepository implements AddSectorRepository {
  constructor (
    private readonly prismaClient: PrismaClient
  ) {}

  async addSector (sector: AddSectorRepository.Params): Promise<AddSectorRepository.Result> {
    const { name } = sector
    const sectorResult = await this.prismaClient.sector.create({
      data: {
        name
      }
    })
    return sectorResult !== null
  }
}

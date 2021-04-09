import {
  AddSectorRepository,
  CheckSectorByNameRepository,
  LoadSectorsRepository
} from '@/data/protocols'
import { PrismaHelper } from '@/infra/db/postgres-prisma'

export class SectorPostgresRepository implements
  AddSectorRepository,
  CheckSectorByNameRepository,
  LoadSectorsRepository {
  async addSector (sector: AddSectorRepository.Params): Promise<AddSectorRepository.Model> {
    const { name } = sector
    const prismaClient = await PrismaHelper.getConnection()
    const sectorModel = await prismaClient.sector.create({
      data: {
        name
      }
    })
    return sectorModel !== null
  }

  async checkByName (name: string): Promise<boolean> {
    const prismaClient = await PrismaHelper.getConnection()
    const sector = await prismaClient.sector.findFirst({
      where: {
        name: name
      }
    })
    return sector !== null
  }

  async loadAll (): Promise<LoadSectorsRepository.Model> {
    const prismaClient = await PrismaHelper.getConnection()
    const sectors = await prismaClient.sector.findMany()
    return sectors
  }
}

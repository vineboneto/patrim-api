import {
  AddSectorRepository,
  CheckSectorByIdRepository,
  CheckSectorByNameRepository,
  DeleteSectorRepository,
  LoadSectorsRepository
} from '@/data/protocols'
import { PrismaHelper } from '@/infra/db/postgres-prisma'

export class SectorPostgresRepository implements
  AddSectorRepository,
  DeleteSectorRepository,
  CheckSectorByNameRepository,
  CheckSectorByIdRepository,
  LoadSectorsRepository {
  async add (sector: AddSectorRepository.Params): Promise<AddSectorRepository.Model> {
    const { name } = sector
    const prismaClient = await PrismaHelper.getConnection()
    const sectorModel = await prismaClient.sector.create({
      data: {
        name
      }
    })
    return sectorModel !== null
  }

  async delete (id: number): Promise<DeleteSectorRepository.Model> {
    const prismaClient = await PrismaHelper.getConnection()
    const sectorDeleted = await prismaClient.sector.delete({
      where: {
        id: id
      }
    })
    return sectorDeleted
  }

  async checkByName (name: string): Promise<boolean> {
    const prismaClient = await PrismaHelper.getConnection()
    const sector = await prismaClient.sector.findFirst({
      where: {
        name: name
      },
      select: {
        id: true
      }
    })
    return sector !== null
  }

  async checkById (id: number): Promise<CheckSectorByIdRepository.Result> {
    const prismaClient = await PrismaHelper.getConnection()
    const sectorWithOnlyId = await prismaClient.sector.findFirst({
      where: {
        id
      },
      select: {
        id: true
      }
    })
    return sectorWithOnlyId !== null
  }

  async loadAll (): Promise<LoadSectorsRepository.Model> {
    const prismaClient = await PrismaHelper.getConnection()
    const sectors = await prismaClient.sector.findMany()
    return sectors
  }
}

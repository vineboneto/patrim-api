import {
  AddSectorRepository,
  CheckSectorByIdRepository,
  CheckSectorByNameRepository,
  DeleteSectorRepository,
  LoadSectorsRepository,
  UpdateSectorRepository
} from '@/data/protocols'
import { PrismaHelper } from '@/infra/db/postgres-prisma'

export class SectorPostgresRepository implements
  AddSectorRepository,
  UpdateSectorRepository,
  DeleteSectorRepository,
  CheckSectorByNameRepository,
  CheckSectorByIdRepository,
  LoadSectorsRepository {
  async add (sector: AddSectorRepository.Params): Promise<AddSectorRepository.Model> {
    const { name } = sector
    const prismaClient = PrismaHelper.getConnection()
    const sectorModel = await prismaClient.sector.create({
      data: {
        name
      }
    })
    return sectorModel !== null
  }

  async update (sector: UpdateSectorRepository.Params): Promise<UpdateSectorRepository.Result> {
    const { id, name } = sector
    const prismaClient = PrismaHelper.getConnection()
    const sectorResult = await prismaClient.sector.update({
      where: {
        id: Number(id)
      },
      data: {
        name
      }
    })
    return sectorResult !== null
  }

  async delete (id: string): Promise<DeleteSectorRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const sectorDeleted = await prismaClient.sector.delete({
      where: {
        id: Number(id)
      }
    })
    return sectorDeleted ? this.convertIdToString(sectorDeleted) : null
  }

  async checkByName (name: string): Promise<boolean> {
    const prismaClient = PrismaHelper.getConnection()
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

  async checkById (id: string): Promise<CheckSectorByIdRepository.Result> {
    const prismaClient = PrismaHelper.getConnection()
    const sectorWithOnlyId = await prismaClient.sector.findFirst({
      where: {
        id: Number(id)
      },
      select: {
        id: true
      }
    })
    return sectorWithOnlyId !== null
  }

  async loadAll (): Promise<LoadSectorsRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const sectors = await prismaClient.sector.findMany()
    return sectors.map(sector => sector ? this.convertIdToString(sector) : null)
  }

  private convertIdToString (entity: any): any {
    return {
      ...entity,
      id: entity.id.toString()
    }
  }
}

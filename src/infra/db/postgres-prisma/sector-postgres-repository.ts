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
  async add (sector: AddSectorRepository.Params): Promise<AddSectorRepository.Result> {
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

  async delete (params: DeleteSectorRepository.Params): Promise<DeleteSectorRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const sectorDeleted = await prismaClient.sector.delete({
      where: {
        id: Number(params.id)
      }
    })
    return sectorDeleted
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

  async checkById (params: CheckSectorByIdRepository.Params): Promise<CheckSectorByIdRepository.Result> {
    const prismaClient = PrismaHelper.getConnection()
    const { id } = params
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

  async loadAll (params: LoadSectorsRepository.Params): Promise<LoadSectorsRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const { skip, take } = params
    if (isNaN(skip) || isNaN(take)) {
      return await prismaClient.sector.findMany()
    }
    return await prismaClient.sector.findMany({
      skip: Number(skip),
      take: Number(take)
    })
  }
}

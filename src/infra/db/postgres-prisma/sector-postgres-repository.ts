import {
  AddSectorRepository,
  CheckSectorByIdRepository,
  CheckSectorByNameRepository,
  DeleteSectorRepository,
  LoadSectorNameByIdRepository,
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
  LoadSectorsRepository,
  LoadSectorNameByIdRepository {
  async add (sector: AddSectorRepository.Params): Promise<AddSectorRepository.Model> {
    const { name } = sector
    const prismaClient = PrismaHelper.getConnection()
    const sectorModel = await prismaClient.sector.create({
      data: {
        name
      }
    })
    return sectorModel
  }

  async update (sector: UpdateSectorRepository.Params): Promise<UpdateSectorRepository.Model> {
    const { id, name } = sector
    const prismaClient = PrismaHelper.getConnection()
    const sectorModel = await prismaClient.sector.update({
      where: {
        id: Number(id)
      },
      data: {
        name
      }
    })
    return sectorModel
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

  async loadNameById (id: number): Promise<LoadSectorNameByIdRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const sector = prismaClient.sector.findFirst({
      where: {
        id: Number(id)
      },
      select: {
        name: true
      }
    })
    return sector
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
}

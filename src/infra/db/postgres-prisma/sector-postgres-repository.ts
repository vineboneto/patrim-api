import {
  AddSectorRepository,
  DeleteSectorRepository,
  LoadSectorByIdRepository,
  LoadSectorsRepository,
  UpdateSectorRepository
} from '@/data/protocols'
import { PrismaHelper } from '@/infra/db/postgres-prisma'

export class SectorPostgresRepository implements
  AddSectorRepository,
  UpdateSectorRepository,
  DeleteSectorRepository,
  LoadSectorsRepository,
  LoadSectorByIdRepository {
  async add (sector: AddSectorRepository.Params): Promise<AddSectorRepository.Model> {
    const { name, accountId } = sector
    const prismaClient = PrismaHelper.getConnection()
    const sectorModel: any = await prismaClient.sector.create({
      data: {
        name,
        userId: Number(accountId)
      },
      select: this.selectData()
    })
    return sectorModel
  }

  async update (sector: UpdateSectorRepository.Params): Promise<UpdateSectorRepository.Model> {
    const { id, name } = sector
    const prismaClient = PrismaHelper.getConnection()
    const sectorModel: any = await prismaClient.sector.update({
      where: {
        id: Number(id)
      },
      data: {
        name
      },
      select: this.selectData()
    })
    return sectorModel
  }

  async delete (params: DeleteSectorRepository.Params): Promise<DeleteSectorRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const sectorDeleted: any = await prismaClient.sector.delete({
      where: {
        id: Number(params.id)
      },
      select: this.selectData()
    })
    return sectorDeleted
  }

  async loadAll (params: LoadSectorsRepository.Params): Promise<LoadSectorsRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const { skip, take, accountId } = params
    let sectors: any
    const where = {
      userId: Number(accountId)
    }
    if (isNaN(skip) || isNaN(take)) {
      sectors = await prismaClient.sector.findMany({
        select: this.selectData(),
        where
      })
    } else {
      sectors = await prismaClient.sector.findMany({
        skip: Number(skip),
        take: Number(take),
        where,
        select: this.selectData()
      })
    }
    const count = await prismaClient.sector.count({ where })
    return {
      model: sectors,
      count
    }
  }

  async loadById (params: LoadSectorByIdRepository.Params): Promise<LoadSectorByIdRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const sector: any = await prismaClient.sector.findFirst({
      where: {
        id: Number(params.id),
        userId: Number(params.accountId)
      },
      select: this.selectData()
    })
    return sector
  }

  private selectData (): any {
    return {
      id: true,
      name: true
    }
  }
}

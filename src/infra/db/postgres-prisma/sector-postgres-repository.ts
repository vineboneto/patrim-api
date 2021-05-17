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

  async checkByName (params: CheckSectorByNameRepository.Params): Promise<boolean> {
    const prismaClient = PrismaHelper.getConnection()
    const sector = await prismaClient.sector.findFirst({
      where: {
        name: params.name,
        userId: Number(params.accountId)
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

  private selectData (): any {
    return {
      id: true,
      name: true
    }
  }
}

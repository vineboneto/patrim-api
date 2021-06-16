import { PrismaHelper } from '@/infra/db/postgres-prisma'
import {
  CheckPatrimonyByOwnerIdRepository,
  CheckPatrimonyByCategoryIdRepository,
  CheckPatrimonyByNumberRepository,
  CheckPatrimonyByIdRepository,
  LoadPatrimonyOwnerIdByIdRepository,
  LoadPatrimonyNumberByIdRepository,
  LoadPatrimoniesByCategoryIdRepository,
  LoadPatrimoniesBySectorIdRepository
} from '@/data/protocols'

export class PatrimonyPostgresRepository implements
  CheckPatrimonyByNumberRepository,
  LoadPatrimoniesByCategoryIdRepository,
  LoadPatrimonyNumberByIdRepository,
  LoadPatrimonyOwnerIdByIdRepository,
  CheckPatrimonyByOwnerIdRepository,
  CheckPatrimonyByCategoryIdRepository {
  async loadNumberById (id: number): Promise<LoadPatrimonyNumberByIdRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient.patrimony.findFirst({
      select: {
        number: true
      },
      where: {
        id: Number(id)
      }
    })
    return patrimony
  }

  async loadOwnerIdById (id: number): Promise<number> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient.patrimony.findFirst({
      select: {
        ownerId: true
      },
      where: {
        id: Number(id)
      }
    })
    return patrimony?.ownerId || null
  }

  async loadBySectorId (params: LoadPatrimoniesBySectorIdRepository.Params):
  Promise<LoadPatrimoniesBySectorIdRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const whereData = {
      Owner: {
        sectorId: Number(params.sectorId)
      },
      userId: Number(params.accountId)
    }
    let patrimonies: any
    if (isNaN(params.skip) || isNaN(params.take)) {
      patrimonies = await prismaClient.patrimony.findMany({
        where: whereData,
        include: this.includesData()
      })
    } else {
      patrimonies = await prismaClient.patrimony.findMany({
        where: whereData,
        include: this.includesData(),
        skip: Number(params.skip),
        take: Number(params.take)
      })
    }
    const total = await prismaClient.patrimony.count({ where: whereData })
    return this.adaptModel(patrimonies, total)
  }

  async loadByCategoryId (params: LoadPatrimoniesByCategoryIdRepository.Params):
  Promise<LoadPatrimoniesByCategoryIdRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const whereData = {
      categoryId: Number(params.categoryId),
      userId: Number(params.accountId)
    }
    let patrimonies: any
    if (isNaN(params.skip) || isNaN(params.take)) {
      patrimonies = await prismaClient.patrimony.findMany({
        where: whereData,
        include: this.includesData()
      })
    } else {
      patrimonies = await prismaClient.patrimony.findMany({
        where: whereData,
        include: this.includesData(),
        skip: Number(params.skip),
        take: Number(params.take)
      })
    }
    const total = await prismaClient.patrimony.count({ where: whereData })
    return this.adaptModel(patrimonies, total)
  }

  async checkById (params: CheckPatrimonyByIdRepository.Params): Promise<CheckPatrimonyByIdRepository.Result> {
    const { id } = params
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient.patrimony.findFirst({
      select: {
        id: true
      },
      where: {
        id: Number(id)
      }
    })
    return patrimony !== null
  }

  async checkByNumber (params: CheckPatrimonyByNumberRepository.Params): Promise<boolean> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient.patrimony.findFirst({
      select: {
        id: true
      },
      where: {
        number: params.number,
        userId: params.accountId
      }
    })
    return patrimony !== null
  }

  async checkByOwnerId (params: CheckPatrimonyByOwnerIdRepository.Params):
  Promise<CheckPatrimonyByOwnerIdRepository.Result> {
    const { ownerId } = params
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient.patrimony.findFirst({
      select: {
        id: true
      },
      where: {
        ownerId: Number(ownerId)
      }
    })
    return patrimony !== null
  }

  async checkByCategoryId (params: CheckPatrimonyByCategoryIdRepository.Params):
  Promise<CheckPatrimonyByCategoryIdRepository.Result> {
    const prismaClient = PrismaHelper.getConnection()
    const { categoryId } = params
    const patrimony = await prismaClient.patrimony.findFirst({
      select: {
        id: true
      },
      where: {
        categoryId: Number(categoryId)
      }
    })
    return patrimony !== null
  }

  private adaptModel (patrimonies: any, total: any): any {
    return {
      model: patrimonies.map(patrimony => PrismaHelper.adaptPatrimony(patrimony)),
      count: total
    }
  }

  private includesData (): any {
    return {
      Category: true,
      Owner: {
        include: {
          Sector: true
        }
      }
    }
  }
}

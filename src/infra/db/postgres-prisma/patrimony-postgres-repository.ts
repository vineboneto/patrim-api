import { PrismaHelper } from '@/infra/db/postgres-prisma'
import {
  CheckPatrimonyByOwnerIdRepository,
  LoadPatrimoniesByOwnerIdRepository,
  CheckPatrimonyByCategoryIdRepository,
  CheckPatrimonyByNumberRepository,
  AddPatrimonyRepository,
  UpdatePatrimonyRepository,
  CheckPatrimonyByIdRepository,
  LoadPatrimonyOwnerIdByIdRepository,
  LoadPatrimonyNumberByIdRepository,
  DeletePatrimonyRepository,
  LoadPatrimoniesRepository,
  LoadPatrimonyByIdRepository,
  LoadPatrimoniesByCategoryIdRepository,
  LoadPatrimonyByNumberRepository
} from '@/data/protocols'

export class PatrimonyPostgresRepository implements
  AddPatrimonyRepository,
  UpdatePatrimonyRepository,
  DeletePatrimonyRepository,
  CheckPatrimonyByNumberRepository,
  LoadPatrimoniesByOwnerIdRepository,
  LoadPatrimoniesByCategoryIdRepository,
  LoadPatrimonyNumberByIdRepository,
  LoadPatrimonyOwnerIdByIdRepository,
  LoadPatrimonyByNumberRepository,
  LoadPatrimonyByIdRepository,
  CheckPatrimonyByOwnerIdRepository,
  CheckPatrimonyByCategoryIdRepository {
  async add (params: AddPatrimonyRepository.Params): Promise<AddPatrimonyRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony: any = await prismaClient.patrimony.create({
      data: {
        number: params.number,
        brand: params.brand,
        description: params.description,
        ownerId: Number(params.ownerId),
        userId: Number(params.accountId),
        categoryId: Number(params.categoryId)
      },
      include: this.includesData()
    })
    return PrismaHelper.adaptPatrimony(patrimony)
  }

  async update (params: UpdatePatrimonyRepository.Params): Promise<UpdatePatrimonyRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony: any = await prismaClient.patrimony.update({
      where: {
        id: Number(params.id)
      },
      data: {
        number: params.number,
        brand: params.brand,
        description: params.description,
        ownerId: Number(params.ownerId),
        userId: Number(params.accountId),
        categoryId: Number(params.categoryId)
      },
      include: this.includesData()
    })
    return PrismaHelper.adaptPatrimony(patrimony)
  }

  async delete (params: DeletePatrimonyRepository.Params): Promise<DeletePatrimonyRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony: any = await prismaClient.patrimony.delete({
      where: {
        id: Number(params.id)
      },
      include: this.includesData()
    })
    return PrismaHelper.adaptPatrimony(patrimony)
  }

  async loadAll (params: LoadPatrimoniesRepository.Params): Promise<LoadPatrimoniesRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const { skip, take, accountId } = params
    let patrimonies: any
    const whereData = {
      userId: Number(accountId)
    }
    if (isNaN(skip) || isNaN(take)) {
      patrimonies = await prismaClient.patrimony.findMany({
        include: this.includesData(),
        where: whereData
      })
    } else {
      patrimonies = await prismaClient.patrimony.findMany({
        include: this.includesData(),
        skip: Number(skip),
        take: Number(take),
        where: whereData
      })
    }
    const total = await prismaClient.patrimony.count({ where: whereData })
    return this.adaptModel(patrimonies, total)
  }

  async loadById (params: LoadPatrimonyByIdRepository.Params): Promise<LoadPatrimonyByIdRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony: any = await prismaClient.patrimony.findFirst({
      where: {
        id: Number(params.id),
        userId: Number(params.accountId)
      },
      include: this.includesData()
    })
    return patrimony ? PrismaHelper.adaptPatrimony(patrimony) : null
  }

  async loadByNumber (params: LoadPatrimonyByNumberRepository.Params): Promise<LoadPatrimonyByNumberRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony: any = await prismaClient.patrimony.findFirst({
      where: {
        number: params.number,
        userId: Number(params.accountId)
      },
      include: this.includesData()
    })
    return patrimony ? PrismaHelper.adaptPatrimony(patrimony) : null
  }

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

  async loadByOwnerId (params: LoadPatrimoniesByOwnerIdRepository.Params):
  Promise<LoadPatrimoniesByOwnerIdRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const whereData = {
      ownerId: Number(params.ownerId),
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

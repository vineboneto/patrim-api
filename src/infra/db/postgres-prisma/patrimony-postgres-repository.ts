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
  LoadPatrimoniesByCategoryIdRepository
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
    const { skip, take } = params
    let patrimonies: any
    if (isNaN(skip) || isNaN(take)) {
      patrimonies = await prismaClient.patrimony.findMany({
        include: this.includesData()
      })
    } else {
      patrimonies = await prismaClient.patrimony.findMany({
        include: this.includesData(),
        skip: Number(skip),
        take: Number(take)
      })
    }
    return patrimonies.map(patrimony => PrismaHelper.adaptPatrimony(patrimony))
  }

  async loadById (params: LoadPatrimonyByIdRepository.Params): Promise<LoadPatrimonyByIdRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony: any = await prismaClient.patrimony.findFirst({
      where: {
        id: Number(params.id)
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
    let patrimonies: any
    if (isNaN(params.skip) || isNaN(params.take)) {
      patrimonies = await prismaClient.patrimony.findMany({
        where: { ownerId: Number(params.ownerId) },
        include: this.includesData()
      })
    } else {
      patrimonies = await prismaClient.patrimony.findMany({
        where: { ownerId: Number(params.ownerId) },
        include: this.includesData(),
        skip: Number(params.skip),
        take: Number(params.take)
      })
    }
    return patrimonies.map(patrimony => PrismaHelper.adaptPatrimony(patrimony))
  }

  async loadByCategoryId (params: LoadPatrimoniesByCategoryIdRepository.Params):
  Promise<LoadPatrimoniesByCategoryIdRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    let patrimonies: any
    if (isNaN(params.skip) || isNaN(params.take)) {
      patrimonies = await prismaClient.patrimony.findMany({
        where: { categoryId: Number(params.categoryId) },
        include: this.includesData()
      })
    } else {
      patrimonies = await prismaClient.patrimony.findMany({
        where: { categoryId: Number(params.categoryId) },
        include: this.includesData(),
        skip: Number(params.skip),
        take: Number(params.take)
      })
    }
    return patrimonies.map(patrimony => PrismaHelper.adaptPatrimony(patrimony))
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

  async checkByNumber (number: string): Promise<boolean> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient.patrimony.findFirst({
      select: {
        id: true
      },
      where: {
        number
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

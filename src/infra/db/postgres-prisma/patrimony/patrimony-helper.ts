import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { PatrimonyModel } from '@/domain/models'

type Params = {
  number?: string
  brand: string
  description?: string
  ownerId: number
  categoryId: number
  accountId: number
}

export const PatrimonyHelper = {
  adaptPatrimony (patrimony: any): PatrimonyModel {
    return {
      id: patrimony.id,
      number: patrimony?.number,
      description: patrimony?.description,
      brand: patrimony.brand,
      category: {
        id: patrimony.Category.id,
        name: patrimony.Category.name
      },
      owner: {
        id: patrimony.Owner.id,
        name: patrimony.Owner.name,
        sector: {
          id: patrimony.Owner.Sector.id,
          name: patrimony.Owner.Sector.name
        }
      }
    }
  },

  adaptArrayPatrimony (patrimonies: any, total: any): any {
    return {
      model: patrimonies.map(patrimony => this.adaptPatrimony(patrimony)),
      count: total
    }
  },

  includesDataPatrimony (): any {
    return {
      Category: true,
      Owner: {
        include: {
          Sector: true
        }
      }
    }
  },

  dataToInsertOrUpdate (params: Params): any {
    return {
      number: params?.number,
      brand: params.brand,
      description: params.description,
      ownerId: Number(params.ownerId),
      userId: Number(params.accountId),
      categoryId: Number(params.categoryId)
    }
  },

  async loadPatrimoniesWhere (where: any, skip?: number, take?: number): Promise<any> {
    const prismaClient = PrismaHelper.getConnection()
    let patrimonies: any
    if (this.isNaNs(skip, take)) {
      patrimonies = await prismaClient.patrimony.findMany({ where, include: this.includesDataPatrimony() })
    } else {
      patrimonies = await prismaClient.patrimony.findMany({
        where,
        include: this.includesDataPatrimony(),
        skip: Number(skip),
        take: Number(take)
      })
    }
    const total = await prismaClient.patrimony.count({ where })
    return this.adaptArrayPatrimony(patrimonies, total)
  },

  isNaNs (skip: number, take: number): boolean {
    if (isNaN(skip) || isNaN(take)) {
      return true
    }
    return false
  }
}

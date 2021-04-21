import { OwnerModel, PatrimonyModel } from '@/domain/models'
import { Category, Owner, Patrimony, Place, PrismaClient, Sector } from '@prisma/client'

type PatrimonyPrisma = Patrimony & {
  Category: Category
  Owner: Owner & {
    Sector: Sector
  }
  Place: Place
}
type OwnerPrisma = Owner & { Sector: Sector }

export const PrismaHelper = {
  client: (null as unknown) as PrismaClient,

  connect (): void {
    if (this.client) return
    this.client = new PrismaClient()
  },

  disconnect (): void {
    this.client.$disconnect()
  },

  getConnection (): PrismaClient {
    return this.client
  },

  adaptPatrimony (patrimony: PatrimonyPrisma): PatrimonyModel {
    return {
      id: patrimony.id,
      number: patrimony.number,
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
      },
      place: {
        id: patrimony.Owner.id,
        name: patrimony.Owner.name
      }
    }
  },

  adaptOwner (owner: OwnerPrisma): OwnerModel {
    return {
      id: owner.id,
      name: owner.name,
      sector: {
        id: owner.Sector.id,
        name: owner.Sector.name
      }
    }
  }
}

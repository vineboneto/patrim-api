import { OwnerModel } from '@/domain/models'
import { Owner, PrismaClient, Sector } from '@prisma/client'

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

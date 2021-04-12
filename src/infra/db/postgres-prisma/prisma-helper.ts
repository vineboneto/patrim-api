import { PrismaClient } from '@prisma/client'

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
  }
}

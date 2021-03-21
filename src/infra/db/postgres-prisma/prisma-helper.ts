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

  async getConnection (): Promise<PrismaClient> {
    return this.client
  }
}

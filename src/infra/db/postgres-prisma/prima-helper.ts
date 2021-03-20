import { PrismaClient } from '@prisma/client'

export const PrismaHelper = {
  client: (null as unknown) as PrismaClient,

  connect (): void {
    this.client = new PrismaClient()
  },

  disconnect (): void {
    this.client.$disconnect()
  },

  async getCollection (): Promise<PrismaClient> {
    return this.client
  }

}

import { PrismaHelper } from '@/infra/db/postgres-prisma'

export const adaptArrayPatrimony = (patrimonies: any, total: any): any => {
  return {
    model: patrimonies.map(patrimony => PrismaHelper.adaptPatrimony(patrimony)),
    count: total
  }
}

export const includesDataPatrimony = (): any => ({
  Category: true,
  Owner: {
    include: {
      Sector: true
    }
  }
})

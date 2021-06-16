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

export const loadPatrimoniesWhere = async (where: any, skip?: number, take?: number): Promise<any> => {
  const prismaClient = PrismaHelper.getConnection()
  if (isNaN(skip) || isNaN(take)) {
    return Promise.resolve(prismaClient.patrimony.findMany({
      where,
      include: includesDataPatrimony()
    }))
  }
  return Promise.resolve(prismaClient.patrimony.findMany({
    where,
    include: includesDataPatrimony(),
    skip: Number(skip),
    take: Number(take)
  }))
}

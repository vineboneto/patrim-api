import { PrismaHelper } from '@/infra/db/postgres-prisma'

export const deleteAll = async (): Promise<void> => {
  const prismaClient = PrismaHelper.getConnection()
  await prismaClient.$executeRaw('TRUNCATE "User", "Patrimony", "Owner", "Sector", "Category", "LogError" CASCADE')
  await prismaClient.$executeRaw('ALTER SEQUENCE "User_id_seq" RESTART WITH 1;')
  await prismaClient.$executeRaw('ALTER SEQUENCE "Patrimony_id_seq" RESTART WITH 1;')
  await prismaClient.$executeRaw('ALTER SEQUENCE "Owner_id_seq" RESTART WITH 1;')
  await prismaClient.$executeRaw('ALTER SEQUENCE "Sector_id_seq" RESTART WITH 1;')
  await prismaClient.$executeRaw('ALTER SEQUENCE "Category_id_seq" RESTART WITH 1;')
  await prismaClient.$executeRaw('ALTER SEQUENCE "LogError_id_seq" RESTART WITH 1;')
}

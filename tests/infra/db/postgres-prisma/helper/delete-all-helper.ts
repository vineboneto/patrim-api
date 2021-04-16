import { PrismaHelper } from '@/infra/db/postgres-prisma'

export const deleteAll = async (): Promise<void> => {
  const prismaClient = PrismaHelper.getConnection()
  await prismaClient.$executeRaw('DELETE FROM "User";')
  await prismaClient.$executeRaw('ALTER SEQUENCE "User_id_seq" RESTART WITH 1;')
  await prismaClient.$executeRaw('DELETE FROM "Patrimony";')
  await prismaClient.$executeRaw('ALTER SEQUENCE "Patrimony_id_seq" RESTART WITH 1;')
  await prismaClient.$executeRaw('DELETE FROM "Owner";')
  await prismaClient.$executeRaw('ALTER SEQUENCE "Owner_id_seq" RESTART WITH 1;')
  await prismaClient.$executeRaw('DELETE FROM "Sector";')
  await prismaClient.$executeRaw('ALTER SEQUENCE "Sector_id_seq" RESTART WITH 1;')
  await prismaClient.$executeRaw('DELETE FROM "Category";')
  await prismaClient.$executeRaw('ALTER SEQUENCE "Category_id_seq" RESTART WITH 1;')
  await prismaClient.$executeRaw('DELETE FROM "LogError";')
  await prismaClient.$executeRaw('ALTER SEQUENCE "LogError_id_seq" RESTART WITH 1;')
}

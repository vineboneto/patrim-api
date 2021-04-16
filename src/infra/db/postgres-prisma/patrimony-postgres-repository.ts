import { PrismaHelper } from '@/infra/db/postgres-prisma'
import {
  CheckPatrimonyByOwnerIdRepository,
  LoadPatrimonyByOwnerIdRepository,
  CheckPatrimonyByCategoryIdRepository
} from '@/data/protocols'

export class PatrimonyPostgresRepository implements
  LoadPatrimonyByOwnerIdRepository,
  CheckPatrimonyByOwnerIdRepository,
  CheckPatrimonyByCategoryIdRepository {
  async loadByOwnerId (params: LoadPatrimonyByOwnerIdRepository.Params):
  Promise<LoadPatrimonyByOwnerIdRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient.patrimony.findFirst({
      select: {
        id: true,
        number: true
      },
      where: {
        ownerId: Number(params.ownerId)
      }
    })
    return patrimony
  }

  async checkByOwnerId (params: CheckPatrimonyByOwnerIdRepository.Params):
  Promise<CheckPatrimonyByOwnerIdRepository.Result> {
    const { ownerId } = params
    if (isNaN(ownerId)) {
      return false
    }
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient.patrimony.findFirst({
      select: {
        id: true
      },
      where: {
        ownerId: Number(ownerId)
      }
    })
    return patrimony !== null
  }

  async checkByCategoryId (params: CheckPatrimonyByCategoryIdRepository.Params):
  Promise<CheckPatrimonyByCategoryIdRepository.Result> {
    const prismaClient = PrismaHelper.getConnection()
    const { categoryId } = params
    if (isNaN(categoryId)) {
      return false
    }
    const patrimony = await prismaClient.patrimony.findFirst({
      select: {
        id: true
      },
      where: {
        categoryId: Number(params.categoryId)
      }
    })
    return patrimony !== null
  }
}

import { PrismaHelper } from '@/infra/db/postgres-prisma'
import {
  CheckPatrimonyByOwnerIdRepository,
  LoadPatrimonyByOwnerIdRepository,
  CheckPatrimonyByCategoryIdRepository,
  CheckPatrimonyByPlaceIdRepository,
  AddPatrimonyRepository
} from '@/data/protocols'

export class PatrimonyPostgresRepository implements
  AddPatrimonyRepository,
  LoadPatrimonyByOwnerIdRepository,
  CheckPatrimonyByOwnerIdRepository,
  CheckPatrimonyByCategoryIdRepository,
  CheckPatrimonyByPlaceIdRepository {
  async add (params: AddPatrimonyRepository.Params): Promise<AddPatrimonyRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient.patrimony.create({
      data: {
        number: params.number,
        brand: params.brand,
        description: params?.description,
        ownerId: params.ownerId,
        placeId: params.placeId,
        categoryId: params.categoryId
      },
      include: {
        Category: true,
        Owner: true,
        Place: true
      }
    })
    return PrismaHelper.adaptPatrimony(patrimony)
  }

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
    const patrimony = await prismaClient.patrimony.findFirst({
      select: {
        id: true
      },
      where: {
        categoryId: Number(categoryId)
      }
    })
    return patrimony !== null
  }

  async checkByPlaceId (params: CheckPatrimonyByPlaceIdRepository.Params):
  Promise<CheckPatrimonyByPlaceIdRepository.Result> {
    const prismaClient = PrismaHelper.getConnection()
    const { placeId } = params
    const patrimony = await prismaClient.patrimony.findFirst({
      select: {
        id: true
      },
      where: {
        categoryId: Number(placeId)
      }
    })
    return patrimony !== null
  }
}

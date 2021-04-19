import { PrismaHelper } from '@/infra/db/postgres-prisma'
import {
  CheckPatrimonyByOwnerIdRepository,
  LoadPatrimonyByOwnerIdRepository,
  CheckPatrimonyByCategoryIdRepository,
  CheckPatrimonyByPlaceIdRepository,
  AddPatrimonyRepository
} from '@/data/protocols'
import { Category, Owner, Patrimony, Place } from '@prisma/client'

type PatrimonyPrisma = Patrimony & { Category: Category, Owner: Owner, Place: Place }

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
    return this.adapt(patrimony)
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

  private adapt (patrimony: PatrimonyPrisma): AddPatrimonyRepository.Model {
    return {
      id: patrimony.id,
      number: patrimony.number,
      description: patrimony.description,
      brand: patrimony.brand,
      category: {
        id: patrimony.Category.id,
        name: patrimony.Category.name
      },
      owner: {
        id: patrimony.Owner.id,
        name: patrimony.Owner.name,
        sector: {
          id: patrimony.Owner.id,
          name: patrimony.Owner.name
        }
      },
      place: {
        id: patrimony.Owner.id,
        name: patrimony.Owner.name
      }
    }
  }
}

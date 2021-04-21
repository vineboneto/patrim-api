import { PrismaHelper, PatrimonyPrisma } from '@/infra/db/postgres-prisma'
import {
  CheckPatrimonyByOwnerIdRepository,
  LoadPatrimonyByOwnerIdRepository,
  CheckPatrimonyByCategoryIdRepository,
  CheckPatrimonyByPlaceIdRepository,
  CheckPatrimonyByNumberRepository,
  CheckPlaceByIdRepository,
  AddPatrimonyRepository,
  UpdatePatrimonyRepository,
  CheckPatrimonyByIdRepository,
  LoadPatrimonyNumberByIdRepository,
  DeletePatrimonyRepository,
  LoadPatrimoniesRepository
} from '@/data/protocols'

export class PatrimonyPostgresRepository implements
  AddPatrimonyRepository,
  UpdatePatrimonyRepository,
  DeletePatrimonyRepository,
  CheckPatrimonyByNumberRepository,
  LoadPatrimonyByOwnerIdRepository,
  LoadPatrimonyNumberByIdRepository,
  CheckPatrimonyByOwnerIdRepository,
  CheckPatrimonyByCategoryIdRepository,
  CheckPatrimonyByPlaceIdRepository,
  CheckPlaceByIdRepository {
  async add (params: AddPatrimonyRepository.Params): Promise<AddPatrimonyRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient.patrimony.create({
      data: {
        number: params.number,
        brand: params.brand,
        description: params.description,
        ownerId: Number(params.ownerId),
        placeId: Number(params.placeId),
        categoryId: Number(params.categoryId)
      },
      include: {
        Category: true,
        Owner: {
          include: {
            Sector: true
          }
        },
        Place: true
      }
    })
    return PrismaHelper.adaptPatrimony(patrimony)
  }

  async update (params: UpdatePatrimonyRepository.Params): Promise<UpdatePatrimonyRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient.patrimony.update({
      where: {
        id: Number(params.id)
      },
      data: {
        number: params.number,
        brand: params.brand,
        description: params.description,
        ownerId: Number(params.ownerId),
        placeId: Number(params.placeId),
        categoryId: Number(params.categoryId)
      },
      include: {
        Category: true,
        Owner: {
          include: {
            Sector: true
          }
        },
        Place: true
      }
    })
    return PrismaHelper.adaptPatrimony(patrimony)
  }

  async delete (params: DeletePatrimonyRepository.Params): Promise<DeletePatrimonyRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient.patrimony.delete({
      where: {
        id: Number(params.id)
      },
      include: {
        Category: true,
        Owner: {
          include: {
            Sector: true
          }
        },
        Place: true
      }
    })
    return PrismaHelper.adaptPatrimony(patrimony)
  }

  async loadAll (params: LoadPatrimoniesRepository.Params): Promise<LoadPatrimoniesRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const { skip, take } = params
    let patrimonies: PatrimonyPrisma[]
    if (isNaN(skip) || isNaN(take)) {
      patrimonies = await prismaClient.patrimony.findMany({
        include: {
          Category: true,
          Owner: {
            include: {
              Sector: true
            }
          },
          Place: true
        }
      })
    } else {
      patrimonies = await prismaClient.patrimony.findMany({
        include: {
          Category: true,
          Owner: {
            include: {
              Sector: true
            }
          },
          Place: true
        },
        skip: Number(skip),
        take: Number(take)
      })
    }
    return patrimonies.map(patrimony => PrismaHelper.adaptPatrimony(patrimony))
  }

  async loadNumberById (id: number): Promise<LoadPatrimonyNumberByIdRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient.patrimony.findFirst({
      select: {
        number: true
      },
      where: {
        id: Number(id)
      }
    })
    return patrimony
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

  async checkById (params: CheckPatrimonyByIdRepository.Params): Promise<CheckPatrimonyByIdRepository.Result> {
    const { id } = params
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient.patrimony.findFirst({
      select: {
        id: true
      },
      where: {
        id: Number(id)
      }
    })
    return patrimony !== null
  }

  async checkByNumber (number: string): Promise<boolean> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient.patrimony.findFirst({
      select: {
        id: true
      },
      where: {
        number
      }
    })
    return patrimony !== null
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

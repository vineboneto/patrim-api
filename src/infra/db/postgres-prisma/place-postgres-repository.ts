import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { AddPlaceRepository, UpdatePlaceRepository, CheckPlaceByIdRepository } from '@/data/protocols'

export class PlacePostgresRepository implements
  AddPlaceRepository,
  UpdatePlaceRepository,
  CheckPlaceByIdRepository {
  async add (place: AddPlaceRepository.Params): Promise<AddPlaceRepository.Result> {
    const { name, userId } = place
    const prismaClient = await PrismaHelper.getConnection()
    const placeResult = await prismaClient.place.create({
      data: {
        name,
        userId: Number(userId) || undefined
      }
    })
    return placeResult !== null
  }

  async update (place: UpdatePlaceRepository.Params): Promise<UpdatePlaceRepository.Result> {
    const { id, name, userId } = place
    const prismaClient = await PrismaHelper.getConnection()
    const placeResult = await prismaClient.place.update({
      where: {
        id: Number(id)
      },
      data: {
        name,
        userId: Number(userId) || undefined
      }
    })
    return placeResult !== null
  }

  async checkById (id: number): Promise<CheckPlaceByIdRepository.Result> {
    const prismaClient = await PrismaHelper.getConnection()
    const placeWithOnlyId = await prismaClient.place.findFirst({
      where: {
        id: Number(id)
      },
      select: {
        id: true
      }
    })
    return placeWithOnlyId !== null
  }
}

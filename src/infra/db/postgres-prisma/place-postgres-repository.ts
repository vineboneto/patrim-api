import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { AddPlaceRepository, UpdatePlaceRepository } from '@/data/protocols'

export class PlacePostgresRepository implements AddPlaceRepository, UpdatePlaceRepository {
  async add (params: AddPlaceRepository.Params): Promise<AddPlaceRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const placeModel = await prismaClient.place.create({
      data: params
    })
    return placeModel
  }

  async update (params: UpdatePlaceRepository.Params): Promise<UpdatePlaceRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const { id, name } = params
    const placeModel = await prismaClient.place.update({
      data: {
        name
      },
      where: {
        id: Number(id)
      }
    })
    return placeModel
  }
}

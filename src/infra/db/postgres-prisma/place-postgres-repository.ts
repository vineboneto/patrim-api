import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { AddPlaceRepository } from '@/data/protocols'

export class PlacePostgresRepository implements AddPlaceRepository {
  async add (params: AddPlaceRepository.Params): Promise<AddPlaceRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const placeModel = await prismaClient.place.create({
      data: params
    })
    return placeModel
  }
}

import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { AddPlaceRepository } from '@/data/protocols'

export class PlacePostgresRepository implements AddPlaceRepository {
  async add (place: AddPlaceRepository.Params): Promise<AddPlaceRepository.Result> {
    const { name, userId } = place
    const prismaClient = await PrismaHelper.getConnection()
    const placeResult = await prismaClient.place.create({
      data: {
        name,
        userId
      }
    })
    return placeResult !== null
  }
}

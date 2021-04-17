import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { AddPlaceRepository, CheckPlaceByNameRepository, UpdatePlaceRepository } from '@/data/protocols'

export class PlacePostgresRepository implements
AddPlaceRepository, UpdatePlaceRepository, CheckPlaceByNameRepository {
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

  async checkByName (name: string): Promise<boolean> {
    const prismaClient = PrismaHelper.getConnection()
    const placeModel = await prismaClient.place.findFirst({
      where: {
        name
      },
      select: {
        id: true
      }
    })
    return placeModel !== null
  }
}

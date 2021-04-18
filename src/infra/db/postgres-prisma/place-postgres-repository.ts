import { PrismaHelper } from '@/infra/db/postgres-prisma'
import {
  AddPlaceRepository,
  CheckPlaceByIdRepository,
  CheckPlaceByNameRepository,
  CheckSectorByIdRepository,
  DeletePlaceRepository,
  LoadPlacesRepository,
  UpdatePlaceRepository
} from '@/data/protocols'

export class PlacePostgresRepository implements
  AddPlaceRepository,
  UpdatePlaceRepository,
  LoadPlacesRepository,
  CheckPlaceByNameRepository,
  DeletePlaceRepository {
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

  async delete (params: DeletePlaceRepository.Params): Promise<DeletePlaceRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const { id } = params
    const placeModel = await prismaClient.place.delete({
      where: {
        id: Number(id)
      }
    })
    return placeModel
  }

  async loadAll (params: LoadPlacesRepository.Params): Promise<LoadPlacesRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const { skip, take } = params
    if (isNaN(skip) || isNaN(take)) {
      return await prismaClient.place.findMany()
    }
    const places = await prismaClient.place.findMany({
      skip: Number(skip),
      take: Number(take)
    })
    return places
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

  async checkById (params: CheckPlaceByIdRepository.Params): Promise<CheckSectorByIdRepository.Result> {
    const prismaClient = PrismaHelper.getConnection()
    const { id } = params
    const placeModel = await prismaClient.place.findFirst({
      where: {
        id: Number(id)
      },
      select: {
        id: true
      }
    })
    return placeModel !== null
  }
}

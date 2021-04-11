import { PrismaHelper } from '@/infra/db/postgres-prisma'
import {
  AddPlaceRepository,
  UpdatePlaceRepository,
  CheckPlaceByIdRepository,
  CheckPlaceByNameRepository,
  LoadPlacesRepository
} from '@/data/protocols'

export class PlacePostgresRepository implements
  AddPlaceRepository,
  UpdatePlaceRepository,
  CheckPlaceByIdRepository,
  CheckPlaceByNameRepository,
  LoadPlacesRepository {
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

  async checkById (id: string): Promise<CheckPlaceByIdRepository.Result> {
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

  async checkByName (name: string): Promise<CheckPlaceByNameRepository.Result> {
    const prismaClient = await PrismaHelper.getConnection()
    const placeWithOnlyId = await prismaClient.place.findFirst({
      where: {
        name: name
      },
      select: {
        id: true
      }
    })
    return placeWithOnlyId !== null
  }

  async loadAll (): Promise<LoadPlacesRepository.Model> {
    const prismaClient = await PrismaHelper.getConnection()
    const places = await prismaClient.place.findMany()
    const placesCollections = places.map((place) => {
      return {
        ...place,
        id: place.id.toString(),
        userId: place.userId ? place.userId.toString() : null
      }
    })
    return placesCollections
  }
}

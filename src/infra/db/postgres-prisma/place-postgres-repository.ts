import { PrismaHelper } from '@/infra/db/postgres-prisma'
import {
  AddPlaceRepository,
  UpdatePlaceRepository,
  CheckPlaceByIdRepository,
  CheckPlaceByNameRepository,
  LoadPlacesRepository
} from '@/data/protocols'

import { PrismaClient } from '@prisma/client'

export class PlacePostgresRepository implements
  AddPlaceRepository,
  UpdatePlaceRepository,
  CheckPlaceByIdRepository,
  CheckPlaceByNameRepository,
  LoadPlacesRepository {
  private readonly prismaClient: PrismaClient

  constructor () {
    this.prismaClient = PrismaHelper.getConnection()
  }

  async add (place: AddPlaceRepository.Params): Promise<AddPlaceRepository.Result> {
    const { name, userId } = place
    const placeResult = await this.prismaClient.place.create({
      data: {
        name,
        userId: Number(userId) || undefined
      }
    })
    return placeResult !== null
  }

  async update (place: UpdatePlaceRepository.Params): Promise<UpdatePlaceRepository.Result> {
    const { id, name, userId } = place
    const placeResult = await this.prismaClient.place.update({
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
    const placeWithOnlyId = await this.prismaClient.place.findFirst({
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
    const placeWithOnlyId = await this.prismaClient.place.findFirst({
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
    const places = await this.prismaClient.place.findMany()
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

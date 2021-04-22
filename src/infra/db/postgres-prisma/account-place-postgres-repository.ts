import { AddAccountPlaceRepository } from '@/data/protocols'
import { PrismaHelper } from '@/infra/db/postgres-prisma'

export class AccountPlacePostgresRepository implements AddAccountPlaceRepository {
  async add (params: AddAccountPlaceRepository.Params): Promise<AddAccountPlaceRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const accountPlace = await prismaClient.userPlace.create({
      data: {
        placeId: Number(params.placeId),
        userId: Number(params.accountId)
      }
    })
    return {
      id: accountPlace.id,
      accountId: accountPlace.userId,
      placeId: accountPlace.placeId
    }
  }
}

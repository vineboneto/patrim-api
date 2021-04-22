import { AddAccountPlaceRepository } from '@/data/protocols'
import { PrismaHelper } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import { UserPlace } from '@prisma/client'

export const makeUserPlace = async (accountPlace?: AddAccountPlaceRepository.Params): Promise<UserPlace> => {
  const prismaClient = PrismaHelper.getConnection()
  if (accountPlace) {
    return await prismaClient.userPlace.create({
      data: {
        placeId: accountPlace.placeId,
        userId: accountPlace.accountId
      }
    })
  }
  const { id: userId } = await Helper.makeUser()
  const { id: placeId } = await Helper.makePlace()
  return await prismaClient.userPlace.create({
    data: {
      placeId,
      userId
    }
  })
}

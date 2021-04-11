import { PlacePostgresRepository, PrismaHelper } from '@/infra/db/postgres-prisma'
import { mockAddAccountParams } from '@/tests/domain/mocks'

import { Place, PrismaClient, User } from '@prisma/client'

const makeSut = (): PlacePostgresRepository => new PlacePostgresRepository()

let prismaClient: PrismaClient

const makeUser = async (): Promise<User> => {
  const user = await prismaClient.user.create({
    data: mockAddAccountParams()
  })
  return user
}

const makePlace = async (userId?: number): Promise<Place> => {
  const place = await prismaClient.place.create({
    data: {
      name: 'any_name',
      userId
    }
  })
  return place
}

const findPlace = async (id: number): Promise<Place> => {
  const place = await prismaClient.place.findFirst({
    where: {
      id
    }
  })
  return place
}

describe('PlacePostgresRepository', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    await prismaClient.$executeRaw('DELETE FROM "Place";')
    await prismaClient.$executeRaw('ALTER SEQUENCE "Place_id_seq" RESTART WITH 1;')
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    prismaClient = await PrismaHelper.getConnection()
    await prismaClient.$executeRaw('DELETE FROM "Place";')
  })

  describe('add()', () => {
    test('Should return true on add new place with userId success', async () => {
      const sut = makeSut()
      const { id } = await makeUser()
      const result = await sut.add({
        name: 'any_name',
        userId: id
      })
      expect(result).toBe(true)
    })

    test('Should return true on add new place without userId success', async () => {
      const sut = makeSut()
      const result = await sut.add({
        name: 'any_name'
      })
      expect(result).toBe(true)
    })
  })

  describe('update()', () => {
    test('Should return true on update data with userId success', async () => {
      const sut = makeSut()
      const { id: userId } = await makeUser()
      const { id } = await makePlace(userId)
      const { id: newUserId } = await makeUser()
      const result = await sut.update({
        id,
        name: 'other_name',
        userId: newUserId
      })
      const { name: newName, userId: newUserIdUpdated } = await findPlace(id)
      expect(result).toBe(true)
      expect(newName).toBe('other_name')
      expect(newUserIdUpdated).toBe(newUserId)
    })
  })
})

import { mockAddAccountParams } from '@/../tests/domain/mocks'
import { PlacePostgresRepository, PrismaHelper } from '@/infra/db/postgres-prisma'

import { PrismaClient } from '@prisma/client'

const makeSut = (): PlacePostgresRepository => new PlacePostgresRepository()

let prismaClient: PrismaClient

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
      const { id } = await prismaClient.user.create({
        data: mockAddAccountParams()
      })
      const result = await sut.add({
        name: 'any_name',
        userId: id
      })
      expect(result).toBe(true)
    })
  })
})

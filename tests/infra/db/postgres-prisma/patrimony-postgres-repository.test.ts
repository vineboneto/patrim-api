import { PatrimonyPostgresRepository, PrismaHelper } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import { PrismaClient } from '@prisma/client'

const makeSut = (): PatrimonyPostgresRepository => new PatrimonyPostgresRepository()

let prismaClient: PrismaClient

describe('PatrimonyPostgresRepository', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    await prismaClient.$executeRaw('DELETE FROM "Patrimony";')
    await prismaClient.$executeRaw('ALTER SEQUENCE "Patrimony_id_seq" RESTART WITH 1;')
    await prismaClient.$executeRaw('DELETE FROM "Owner";')
    await prismaClient.$executeRaw('ALTER SEQUENCE "Owner_id_seq" RESTART WITH 1;')
    await prismaClient.$executeRaw('DELETE FROM "Category";')
    await prismaClient.$executeRaw('ALTER SEQUENCE "Category_id_seq" RESTART WITH 1;')
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    prismaClient = PrismaHelper.getConnection()
    await prismaClient.$executeRaw('DELETE FROM "Patrimony";')
  })
  describe('loadByPatrimonyId()', () => {
    test('Should return patrimony on success', async () => {
      const sut = makeSut()
      const { ownerId, id, number } = await Helper.makePatrimony()
      const patrimony = await sut.loadByOwnerId({ ownerId })
      expect(patrimony).toEqual({
        id,
        number
      })
    })
  })

  describe('checkByOwnerId()', () => {
    test('Should return true if exists patrimony', async () => {
      const sut = makeSut()
      const { ownerId } = await Helper.makePatrimony()
      const exists = await sut.checkByOwnerId({ ownerId })
      expect(exists).toBe(true)
    })
  })
})

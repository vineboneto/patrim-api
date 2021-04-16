import { PatrimonyPostgresRepository, PrismaHelper } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import faker from 'faker'

const makeSut = (): PatrimonyPostgresRepository => new PatrimonyPostgresRepository()

describe('PatrimonyPostgresRepository', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    await Helper.deleteAll()
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    await Helper.deleteAll()
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

    test('Should return false if not exists patrimony', async () => {
      const sut = makeSut()
      const exists = await sut.checkByOwnerId({ ownerId: faker.datatype.number() })
      expect(exists).toBe(false)
    })
  })

  describe('checkByOwnerId()', () => {
    test('Should return true if exists patrimony', async () => {
      const sut = makeSut()
      const { categoryId } = await Helper.makePatrimony()
      const exists = await sut.checkByCategoryId({ categoryId })
      expect(exists).toBe(true)
    })

    test('Should return false if not exists patrimony', async () => {
      const sut = makeSut()
      const exists = await sut.checkByCategoryId({ categoryId: faker.datatype.number() })
      expect(exists).toBe(false)
    })
  })
})

import { LoadPatrimonyFieldByIdPostgres, PrismaHelper } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import faker from 'faker'

const makeSut = (field: string): LoadPatrimonyFieldByIdPostgres => new LoadPatrimonyFieldByIdPostgres(field)

describe('LoadPatrimonyFieldById', () => {
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

  describe('loadNumber', () => {
    test('Should return number patrimony on success', async () => {
      const sut = makeSut('number')
      const { id, number } = await Helper.makePatrimony()
      const patrimonyNumber = await sut.loadFieldById(id)
      expect(patrimonyNumber).toEqual(number)
    })

    test('Should return null on fails', async () => {
      const sut = makeSut('number')
      const patrimonyNumber = await sut.loadFieldById(faker.datatype.number())
      expect(patrimonyNumber).toBe(null)
    })
  })

  describe('loadOwnerId', () => {
    test('Should return ownerId on success', async () => {
      const sut = makeSut('ownerId')
      const { id, Owner } = await Helper.makePatrimony()
      const ownerId = await sut.loadFieldById(id)
      expect(ownerId).toBe(Owner.id)
    })

    test('Should return null on fails', async () => {
      const sut = makeSut('ownerId')
      const ownerId = await sut.loadFieldById(faker.datatype.number())
      expect(ownerId).toBe(null)
    })
  })
})

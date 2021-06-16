import { LoadPatrimonyByNumberPostgres, PrismaHelper, PatrimonyHelper } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import faker from 'faker'

const makeSut = (): LoadPatrimonyByNumberPostgres => new LoadPatrimonyByNumberPostgres()

describe('loadByNumber()', () => {
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

  test('Should return patrimony on success', async () => {
    const sut = makeSut()
    const patrimonyModel: any = await Helper.makePatrimony()
    const patrimony = await sut.loadByNumber({
      number: patrimonyModel.number,
      accountId: patrimonyModel.userId
    })
    const patrimony_ = PatrimonyHelper.adaptPatrimony(patrimonyModel)
    expect(patrimony).toEqual(patrimony_)
  })

  test('Should return null on patrimony not exist', async () => {
    const sut = makeSut()
    const patrimony = await sut.loadByNumber({
      number: faker.datatype.number().toString(),
      accountId: faker.datatype.number()
    })
    expect(patrimony).toBe(null)
  })
})

import { LoadPatrimonyByIdPostgres, PrismaHelper, PatrimonyHelper } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import faker from 'faker'

const makeSut = (): LoadPatrimonyByIdPostgres => new LoadPatrimonyByIdPostgres()

describe('loadById()', () => {
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
    const patrimony = await sut.loadById({ id: patrimonyModel.id, accountId: patrimonyModel.userId })
    const patrimony_ = PatrimonyHelper.adaptPatrimony(patrimonyModel)
    expect(patrimony).toEqual(patrimony_)
  })

  test('Should return null on patrimony not exist', async () => {
    const sut = makeSut()
    const patrimony = await sut.loadById({
      id: faker.datatype.number(),
      accountId: faker.datatype.number()
    })
    expect(patrimony).toBe(null)
  })
})

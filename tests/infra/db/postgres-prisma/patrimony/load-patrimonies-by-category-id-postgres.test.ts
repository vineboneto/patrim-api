import { LoadPatrimoniesByCategoryIdPostgres, PrismaHelper, PatrimonyHelper } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import faker from 'faker'

const makeSut = (): LoadPatrimoniesByCategoryIdPostgres => new LoadPatrimoniesByCategoryIdPostgres()

describe('loadByCategoryId()', () => {
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

  test('Should return all patrimonies on success', async () => {
    const sut = makeSut()
    const patrimonies: any = await Helper.makeManyPatrimonies()
    const dataResponse = await sut.loadByCategoryId({
      categoryId: patrimonies[0].Category.id,
      accountId: patrimonies[0].userId
    })
    const patrimonies_ = patrimonies.map(patrimony => PatrimonyHelper.adaptPatrimony(patrimony))
    expect(dataResponse.model).toEqual(patrimonies_)
    expect(dataResponse.count).toBe(3)
  })

  test('Should return the correctly number of patrimonies if take and skip not undefined', async () => {
    const sut = makeSut()
    const patrimonies: any = await Helper.makeManyPatrimonies()
    const dataResponse = await sut.loadByCategoryId({
      categoryId: patrimonies[0].Category.id,
      skip: 0,
      take: 2,
      accountId: patrimonies[0].userId
    })
    const patrimonies_ = patrimonies.map(patrimony => PatrimonyHelper.adaptPatrimony(patrimony))
    expect(dataResponse.model[0]).toEqual(patrimonies_[0])
    expect(dataResponse.model[1]).toEqual(patrimonies_[1])
    expect(dataResponse.model[2]).toBe(undefined)
    expect(dataResponse.model.length).toBe(2)
    expect(dataResponse.count).toBe(3)
  })

  test('Should return empty array if load patrimonies is empty', async () => {
    const sut = makeSut()
    const dataResponse = await sut.loadByCategoryId({
      categoryId: faker.datatype.number(),
      accountId: faker.datatype.number()
    })
    expect(dataResponse.model).toEqual([])
  })
})

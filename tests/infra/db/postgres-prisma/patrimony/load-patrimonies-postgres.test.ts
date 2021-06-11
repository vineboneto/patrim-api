import { LoadPatrimoniesPostgres, PrismaHelper } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import faker from 'faker'

const makeSut = (): LoadPatrimoniesPostgres => new LoadPatrimoniesPostgres()

describe('loadAll()', () => {
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

  test('Should return all patrimonies if take and skip is NaN', async () => {
    const sut = makeSut()
    const patrimonies: any = await Helper.makeManyPatrimonies()
    const dataResponse = await sut.loadAll({
      skip: Number('adfavzv'),
      take: Number('adfasdf'),
      accountId: patrimonies[0].userId
    })
    const patrimonies_ = patrimonies.map(patrimony => PrismaHelper.adaptPatrimony(patrimony))
    expect(dataResponse.model).toEqual(patrimonies_)
    expect(dataResponse.count).toBe(3)
  })

  test('Should return the correctly number of patrimonies if take and skip not undefined', async () => {
    const sut = makeSut()
    const patrimonies: any = await Helper.makeManyPatrimonies()
    const dataResponse = await sut.loadAll({
      skip: 0,
      take: 3,
      accountId: patrimonies[0].userId
    })
    const patrimonies_ = patrimonies.map(patrimony => PrismaHelper.adaptPatrimony(patrimony))
    expect(dataResponse.model[0]).toEqual(patrimonies_[0])
    expect(dataResponse.model[1]).toEqual(patrimonies_[1])
    expect(dataResponse.model[2]).toEqual(patrimonies_[2])
    expect(dataResponse.model[3]).toBe(undefined)
    expect(dataResponse.count).toBe(3)
  })

  test('Should return empty array if load patrimonies is empty', async () => {
    const sut = makeSut()
    const dataResponse = await sut.loadAll({
      skip: NaN,
      take: NaN,
      accountId: faker.datatype.number()
    })
    expect(dataResponse.model).toEqual([])
  })
})

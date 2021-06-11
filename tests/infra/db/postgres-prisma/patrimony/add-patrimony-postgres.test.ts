import { AddPatrimonyPostgres, PrismaHelper } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import faker from 'faker'

const makeSut = (): AddPatrimonyPostgres => new AddPatrimonyPostgres()

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

describe('add()', () => {
  test('Should return patrimony on add success', async () => {
    const sut = makeSut()
    const { id: accountId } = await Helper.makeUser()
    const { id: ownerId } = await Helper.makeOwner()
    const { id: categoryId } = await Helper.makeCategory()
    const data = await sut.add({
      number: faker.datatype.number().toString(),
      brand: faker.random.word(),
      description: faker.random.words(),
      categoryId,
      ownerId,
      accountId
    })
    expect(data).toBeTruthy()
    expect(data.category.id).toBe(categoryId)
    expect(data.owner.id).toBe(ownerId)
  })

  test('Should return patrimony on add if number is null', async () => {
    const sut = makeSut()
    const { id: accountId } = await Helper.makeUser()
    const { id: ownerId } = await Helper.makeOwner()
    const { id: categoryId } = await Helper.makeCategory()
    const data = await sut.add({
      brand: faker.random.word(),
      description: faker.random.words(),
      categoryId,
      ownerId,
      accountId
    })
    expect(data).toBeTruthy()
    expect(data.category.id).toBe(categoryId)
    expect(data.owner.id).toBe(ownerId)
  })
})

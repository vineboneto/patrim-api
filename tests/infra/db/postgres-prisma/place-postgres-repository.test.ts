import { PlacePostgresRepository, PrismaHelper } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'
import { mockAddPlaceRepositoryParams } from '@/tests/data/mocks'

const makeSut = (): PlacePostgresRepository => new PlacePostgresRepository()

describe('PlacePostgresRepository', () => {
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

  test('Should return place on add on success', async () => {
    const sut = makeSut()
    const { id, name } = await sut.add(mockAddPlaceRepositoryParams())
    const place = await Helper.findPlaceById(id)
    expect(place.id).toBe(id)
    expect(place.name).toBe(name)
  })
})

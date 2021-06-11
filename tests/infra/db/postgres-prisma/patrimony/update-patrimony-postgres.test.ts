import { UpdatePatrimonyPostgres, PrismaHelper } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

const makeSut = (): UpdatePatrimonyPostgres => new UpdatePatrimonyPostgres()

describe('update()', () => {
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

  test('Should return patrimony on update success', async () => {
    const sut = makeSut()
    const { id: accountId } = await Helper.makeUser()
    const { id, description, Owner, Category } = await Helper.makePatrimony()
    const data = await sut.update({
      id,
      brand: 'new_brand',
      number: 'new_number',
      ownerId: Owner.id,
      categoryId: Category.id,
      accountId
    })
    expect(data.brand).toBe('new_brand')
    expect(data.number).toBe('new_number')
    expect(data.description).toBe(description)
    expect(data.owner.id).toBe(Owner.id)
    expect(data.category.id).toBe(Category.id)
  })
})

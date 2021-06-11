import { DeletePatrimonyPostgres, PrismaHelper } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

const makeSut = (): DeletePatrimonyPostgres => new DeletePatrimonyPostgres()

describe('add()', () => {
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

  test('Should return patrimony deleted on success', async () => {
    const sut = makeSut()
    const { id, number } = await Helper.makePatrimony()
    const patrimony = await sut.delete({ id })
    const searchPatrimonyDeleted = await Helper.findPatrimonyById(id)
    expect(patrimony.id).toBe(id)
    expect(patrimony.number).toBe(number)
    expect(searchPatrimonyDeleted).toBeFalsy()
  })
})

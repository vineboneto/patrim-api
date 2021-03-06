import { PrismaHelper } from '@/infra/db/postgres-prisma'

describe('PrismaHelper', () => {
  test('Should return same connection if exists client', async () => {
    PrismaHelper.connect()
    const connection = PrismaHelper.getConnection()
    expect(PrismaHelper.client).toBe(connection)
    PrismaHelper.connect()
    expect(PrismaHelper.client).toBe(connection)
  })
})

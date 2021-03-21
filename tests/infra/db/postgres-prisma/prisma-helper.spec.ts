import { PrismaHelper } from '@/infra/db/postgres-prisma/prisma-helper'

describe('PrismaHelper', () => {
  test('Should return same connection if exists client', async () => {
    PrismaHelper.connect()
    const connection = await PrismaHelper.getConnection()
    expect(PrismaHelper.client).toBe(connection)
    PrismaHelper.connect()
    expect(PrismaHelper.client).toBe(connection)
  })
})

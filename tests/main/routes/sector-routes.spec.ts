import app from '@/main/config/app'
import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { makeAccessToken } from '@/tests/main/mocks'

import { PrismaClient } from '@prisma/client'
import request from 'supertest'
import faker from 'faker'

let prismaClient: PrismaClient

describe('Sector Routes', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    await prismaClient.$executeRaw('DELETE FROM "Sector";')
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    prismaClient = await PrismaHelper.getConnection()
    await prismaClient.$executeRaw('ALTER SEQUENCE "Sector_id_seq" RESTART WITH 1;')
    await prismaClient.$executeRaw('DELETE FROM "Sector";')
  })

  describe('POST /sectors', () => {
    test('Should return 204 on save sector', async () => {
      const accessToken = await makeAccessToken(prismaClient)
      await request(app)
        .post('/api/sectors')
        .set('x-access-token', accessToken)
        .send({
          name: faker.name.jobArea()
        })
        .expect(204)
    })
  })
})

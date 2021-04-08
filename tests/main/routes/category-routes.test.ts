import app from '@/main/config/app'
import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { makeAccessToken } from '@/tests/main/mocks'

import { PrismaClient } from '@prisma/client'
import faker from 'faker'
import request from 'supertest'

let prismaClient: PrismaClient

describe('Category Routes', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    await prismaClient.$executeRaw('DELETE FROM "Category";')
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    prismaClient = await PrismaHelper.getConnection()
    await prismaClient.$executeRaw('ALTER SEQUENCE "Category_id_seq" RESTART WITH 1;')
    await prismaClient.$executeRaw('DELETE FROM "Category";')
  })

  describe('POST /categories', () => {
    test('Should return 204 on save category', async () => {
      const accessToken = await makeAccessToken(prismaClient)
      await request(app)
        .post('/api/categories')
        .set('x-access-token', accessToken)
        .send({
          name: faker.name.jobArea()
        })
        .expect(204)
    })

    test('Should return 403 on save category without accessToken', async () => {
      await request(app)
        .post('/api/categories')
        .send({
          name: faker.name.jobArea()
        })
        .expect(403)
    })
  })

  describe('GET /categories', () => {
    test('Should return empty array', async () => {
      const accessToken = await makeAccessToken(prismaClient)
      await request(app)
        .get('/api/categories')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})

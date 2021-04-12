import app from '@/main/config/app'
import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { mockAddCategoriesParams } from '@/tests/data/mocks'
import { makeAccessToken } from '@/tests/main/mocks'

import { Category, PrismaClient } from '@prisma/client'
import faker from 'faker'
import request from 'supertest'

let prismaClient: PrismaClient

const makeCategory = async (): Promise<Category> => {
  const newCategory = await prismaClient.category.create({
    data: {
      name: faker.name.jobArea()
    }
  })
  return newCategory
}

describe('Category Routes', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    await prismaClient.$executeRaw('DELETE FROM "Category";')
    await prismaClient.$executeRaw('ALTER SEQUENCE "Category_id_seq" RESTART WITH 1;')
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    prismaClient = await PrismaHelper.getConnection()
    await prismaClient.$executeRaw('DELETE FROM "Category";')
  })

  describe('POST /categories', () => {
    test('Should return 204 on add category', async () => {
      const accessToken = await makeAccessToken(prismaClient)
      await request(app)
        .post('/api/categories')
        .set('x-access-token', accessToken)
        .send({
          name: faker.name.jobArea()
        })
        .expect(204)
    })

    test('Should return 403 on add category without accessToken', async () => {
      await request(app)
        .post('/api/categories')
        .send({
          name: faker.name.jobArea()
        })
        .expect(403)
    })
  })

  describe('PUT /categories', () => {
    test('Should return 204 on save category', async () => {
      const accessToken = await makeAccessToken(prismaClient)
      const { id } = await makeCategory()
      await request(app)
        .put(`/api/categories/${id}`)
        .set('x-access-token', accessToken)
        .send({
          name: 'new_value'
        })
        .expect(204)
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

    test('Should return all categories', async () => {
      const accessToken = await makeAccessToken(prismaClient)
      await prismaClient.category.createMany({
        data: mockAddCategoriesParams()
      })
      await request(app)
        .get('/api/categories')
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 403 on load without accessToken', async () => {
      await request(app)
        .get('/api/categories')
        .expect(403)
    })
  })

  describe('DELETE /categories/:id', () => {
    test('Should return category deleted on delete success', async () => {
      const accessToken = await makeAccessToken(prismaClient)
      const newCategory = await makeCategory()
      await request(app)
        .delete(`/api/categories/${newCategory.id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})

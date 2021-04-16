import app from '@/main/config/app'
import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { makeAccessToken } from '@/tests/main/mocks'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

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
    await prismaClient.$executeRaw('ALTER SEQUENCE "Category_id_seq" RESTART WITH 1;')
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    prismaClient = await PrismaHelper.getConnection()
    await prismaClient.$executeRaw('DELETE FROM "Category";')
  })

  describe('POST /categories', () => {
    test('Should return 204 on add category', async () => {
      const accessToken = await makeAccessToken()
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
    test('Should return 204 on update category', async () => {
      const accessToken = await makeAccessToken()
      const { id } = await Helper.makeCategory()
      await request(app)
        .put(`/api/categories/${id}`)
        .set('x-access-token', accessToken)
        .send({
          name: 'new_value'
        })
        .expect(204)
    })

    test('Should return 404 on update category with invalid id', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .put(`/api/categories/${faker.datatype.number()}`)
        .set('x-access-token', accessToken)
        .send({
          name: 'new_value'
        })
        .expect(404)
    })
  })

  describe('GET /categories', () => {
    test('Should return empty array', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/categories')
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return all categories', async () => {
      const accessToken = await makeAccessToken()
      await Helper.makeManyCategories()
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
      const accessToken = await makeAccessToken()
      const { id } = await Helper.makeCategory()
      await request(app)
        .delete(`/api/categories/${id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 404 on delete category with invalid id', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .delete(`/api/categories/${faker.datatype.number()}`)
        .set('x-access-token', accessToken)
        .send({
          name: 'new_value'
        })
        .expect(404)
    })
  })
})

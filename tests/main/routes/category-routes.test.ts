import app from '@/main/config/app'
import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { makeAccessToken } from '@/tests/main/mocks'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import faker from 'faker'
import request from 'supertest'

describe('Category Routes', () => {
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

  describe('POST /categories', () => {
    test('Should return 200 on add category', async () => {
      const { accessToken } = await makeAccessToken()
      await request(app)
        .post('/api/categories')
        .set('x-access-token', accessToken)
        .send({
          name: faker.name.jobArea()
        })
        .expect(200)
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
    test('Should return 200 on update category', async () => {
      const { id, userId } = await Helper.makeCategory()
      const { accessToken } = await makeAccessToken(userId)
      await request(app)
        .put(`/api/categories/${id}`)
        .set('x-access-token', accessToken)
        .send({
          name: 'new_value'
        })
        .expect(200)
    })
    test('Should return 403 if category is other user', async () => {
      const { accessToken } = await makeAccessToken()
      const { id } = await Helper.makeCategory()
      await request(app)
        .put(`/api/categories/${id}`)
        .set('x-access-token', accessToken)
        .send({
          name: 'new_value'
        })
        .expect(403)
    })
  })

  describe('GET /categories', () => {
    test('Should return empty array', async () => {
      const { accessToken } = await makeAccessToken()
      await request(app)
        .get('/api/categories')
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return all categories', async () => {
      const categories = await Helper.makeManyCategories()
      const { accessToken } = await makeAccessToken(categories[0].userId)
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

  describe('GET /categories/:id/patrimonies', () => {
    test('Should return 200 on load patrimonies by category id', async () => {
      const patrimonies = await Helper.makeManyPatrimonies()
      const { accessToken } = await makeAccessToken(patrimonies[0].userId)
      await request(app)
        .get(`/api/categories/${patrimonies[0].id}/patrimonies`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 200 on load patrimonies by load categoryId with take and skip', async () => {
      const patrimonies = await Helper.makeManyPatrimonies()
      const { accessToken } = await makeAccessToken(patrimonies[0].userId)
      await request(app)
        .get(`/api/categories/${patrimonies[0].id}/patrimonies?take=2&skip=0`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 204 on load patrimonies by categoryId return empty array', async () => {
      const { accessToken } = await makeAccessToken()
      await request(app)
        .get(`/api/categories/${faker.datatype.number()}/patrimonies`)
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })

  describe('GET /categories/:id', () => {
    test('Should return 204 if category not exist', async () => {
      const { accessToken } = await makeAccessToken()
      await request(app)
        .get(`/api/categories/${faker.datatype.number()}`)
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return 204 if category is other user', async () => {
      const { userId } = await Helper.makeCategory()
      const { accessToken } = await makeAccessToken(userId)
      const { id } = await Helper.makeCategory()
      await request(app)
        .get(`/api/categories/${id}`)
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return 200 on success', async () => {
      const { id, userId } = await Helper.makeCategory()
      const { accessToken } = await makeAccessToken(userId)
      await request(app)
        .get(`/api/categories/${id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 403 on load without accessToken', async () => {
      const { id } = await Helper.makeCategory()
      await request(app)
        .get(`/api/categories/${id}`)
        .expect(403)
    })
  })

  describe('DELETE /categories/:id', () => {
    test('Should return category deleted on delete success', async () => {
      const { id, userId } = await Helper.makeCategory()
      const { accessToken } = await makeAccessToken(userId)
      await request(app)
        .delete(`/api/categories/${id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 403 if category is other user', async () => {
      const { id } = await Helper.makeCategory()
      const { id: userId } = await Helper.makeUser()
      const { accessToken } = await makeAccessToken(userId)
      await request(app)
        .delete(`/api/categories/${id}`)
        .set('x-access-token', accessToken)
        .expect(403)
    })
  })
})

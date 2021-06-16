import app from '@/main/config/app'
import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { makeAccessToken } from '@/tests/main/mocks'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import faker from 'faker'
import request from 'supertest'

describe('Patrimony Routes', () => {
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

  describe('POST /patrimonies', () => {
    test('Should return 200 on add category', async () => {
      const { accessToken } = await makeAccessToken()
      const { id: ownerId } = await Helper.makeOwner()
      const { id: categoryId } = await Helper.makeCategory()
      await request(app)
        .post('/api/patrimonies')
        .set('x-access-token', accessToken)
        .send({
          number: faker.datatype.number().toString(),
          brand: faker.random.word(),
          ownerId,
          categoryId
        })
        .expect(200)
    })

    test('Should return 403 on add without accessToken', async () => {
      const { id: ownerId } = await Helper.makeOwner()
      const { id: categoryId } = await Helper.makeCategory()
      await request(app)
        .post('/api/patrimonies')
        .send({
          number: faker.datatype.number().toString(),
          brand: faker.random.word(),
          ownerId,
          categoryId
        })
        .expect(403)
    })
  })

  describe('PUT /patrimonies', () => {
    test('Should return 200 on update patrimony', async () => {
      const { id, Category, Owner, userId } = await Helper.makePatrimony()
      const { accessToken } = await makeAccessToken(userId)
      await request(app)
        .put(`/api/patrimonies/${id}`)
        .set('x-access-token', accessToken)
        .send({
          number: faker.datatype.number().toString(),
          brand: faker.random.word(),
          ownerId: Owner.id,
          categoryId: Category.id
        })
        .expect(200)
    })

    test('Should return 403 on update patrimony of other user', async () => {
      const { accessToken } = await makeAccessToken()
      const { id, Category, Owner } = await Helper.makePatrimony()
      await request(app)
        .put(`/api/patrimonies/${id}`)
        .set('x-access-token', accessToken)
        .send({
          number: faker.datatype.number().toString(),
          brand: faker.random.word(),
          ownerId: Owner.id,
          categoryId: Category.id
        })
        .expect(403)
    })
  })

  describe('DELETE /patrimonies/:id', () => {
    test('Should return patrimony deleted on delete success', async () => {
      const { id, userId } = await Helper.makePatrimony()
      const { accessToken } = await makeAccessToken(userId)
      await request(app)
        .delete(`/api/patrimonies/${id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 403 if patrimony not exists patrimony', async () => {
      const { userId } = await Helper.makePatrimony()
      const { accessToken } = await makeAccessToken(userId)
      await request(app)
        .delete(`/api/patrimonies/${faker.datatype.number()}`)
        .set('x-access-token', accessToken)
        .expect(403)
    })

    test('Should return 403 if patrimony is other user', async () => {
      const { accessToken } = await makeAccessToken()
      const { id } = await Helper.makePatrimony()
      await request(app)
        .delete(`/api/patrimonies/${id}`)
        .set('x-access-token', accessToken)
        .expect(403)
    })
  })

  describe('GET /patrimonies', () => {
    test('Should return empty array', async () => {
      const { accessToken } = await makeAccessToken()
      await request(app)
        .get('/api/sectors')
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return all patrimonies', async () => {
      const patrimonies = await Helper.makeManyPatrimonies()
      const { accessToken } = await makeAccessToken(patrimonies[0].userId)
      await request(app)
        .get('/api/patrimonies')
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 403 on load without accessToken', async () => {
      await request(app)
        .get('/api/patrimonies')
        .expect(403)
    })
  })

  describe('GET /patrimonies/:id', () => {
    test('Should return 204 if patrimony not exist', async () => {
      const { accessToken } = await makeAccessToken()
      await request(app)
        .get(`/api/patrimonies/${faker.datatype.number()}`)
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return 200 on success', async () => {
      const { id, userId } = await Helper.makePatrimony()
      const { accessToken } = await makeAccessToken(userId)
      await request(app)
        .get(`/api/patrimonies/${id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 403 on load without accessToken', async () => {
      const { id } = await Helper.makePatrimony()
      await request(app)
        .get(`/api/patrimonies/${id}`)
        .expect(403)
    })
  })

  describe('GET /patrimonies/:number/number', () => {
    test('Should return 204 if patrimony not exist', async () => {
      const { accessToken } = await makeAccessToken()
      await request(app)
        .get(`/api/patrimonies/${faker.datatype.number()}/number`)
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return 200 on success', async () => {
      const { number, userId } = await Helper.makePatrimony()
      const { accessToken } = await makeAccessToken(userId)
      await request(app)
        .get(`/api/patrimonies/${number}/number`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 403 on load without accessToken', async () => {
      const { number } = await Helper.makePatrimony()
      await request(app)
        .get(`/api/patrimonies/${number}`)
        .expect(403)
    })
  })
})

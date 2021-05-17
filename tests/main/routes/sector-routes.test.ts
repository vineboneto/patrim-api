import app from '@/main/config/app'
import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { makeAccessToken } from '@/tests/main/mocks'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import request from 'supertest'
import faker from 'faker'

describe('Sector Routes', () => {
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

  describe('POST /sectors', () => {
    test('Should return 204 on add sector', async () => {
      const { accessToken } = await makeAccessToken()
      await request(app)
        .post('/api/sectors')
        .set('x-access-token', accessToken)
        .send({
          name: faker.name.jobArea()
        })
        .expect(200)
    })

    test('Should return 403 on add sector without accessToken', async () => {
      await request(app)
        .post('/api/sectors')
        .send({
          name: faker.name.jobArea()
        })
        .expect(403)
    })
  })

  describe('PUT /sectors', () => {
    test('Should return 200 on update sector', async () => {
      const { accessToken } = await makeAccessToken()
      const { id } = await Helper.makeSector()
      await request(app)
        .put(`/api/sectors/${id}`)
        .set('x-access-token', accessToken)
        .send({
          name: 'new_value'
        })
        .expect(200)
    })
  })

  describe('GET /sectors', () => {
    test('Should return empty array', async () => {
      const { accessToken } = await makeAccessToken()
      await request(app)
        .get('/api/sectors')
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return all sectors', async () => {
      const sectors = await Helper.makeManySectors()
      const { accessToken } = await makeAccessToken(sectors[0].id)
      await request(app)
        .get('/api/sectors')
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 403 on load without accessToken', async () => {
      await request(app)
        .get('/api/sectors')
        .expect(403)
    })
  })

  describe('DELETE /sectors/:id', () => {
    test('Should return sector deleted on delete success', async () => {
      const { accessToken } = await makeAccessToken()
      const { id } = await Helper.makeSector()
      await request(app)
        .delete(`/api/sectors/${id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 403 if owners exists', async () => {
      const { Sector, userId } = await Helper.makeOwner()
      const { accessToken } = await makeAccessToken(userId)
      await request(app)
        .delete(`/api/sectors/${Sector.id}`)
        .set('x-access-token', accessToken)
        .expect(422)
    })
  })
})

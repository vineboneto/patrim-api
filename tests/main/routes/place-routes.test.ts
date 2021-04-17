import app from '@/main/config/app'
import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { makeAccessToken } from '@/tests/main/mocks'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import request from 'supertest'
import faker from 'faker'

describe('Place Routes', () => {
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

  describe('POST /places', () => {
    test('Should return 200 on add place', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/places')
        .set('x-access-token', accessToken)
        .send({
          name: faker.name.findName()
        })
        .expect(200)
    })

    test('Should return 403 on add place without accessToken', async () => {
      await request(app)
        .post('/api/places')
        .send({
          name: faker.name.findName()
        })
        .expect(403)
    })
  })

  describe('PUT /places', () => {
    test('Should return 200 on update place', async () => {
      const accessToken = await makeAccessToken()
      const { id } = await Helper.makePlace()
      await request(app)
        .put(`/api/places/${id}`)
        .set('x-access-token', accessToken)
        .send({
          name: faker.name.findName()
        })
        .expect(200)
    })

    test('Should return 404 on update place with invalid id', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .put(`/api/places/${faker.datatype.number()}`)
        .set('x-access-token', accessToken)
        .send({
          name: faker.name.findName()
        })
        .expect(404)
    })
  })

  describe('DELETE /places/:id', () => {
    test('Should return places deleted on success', async () => {
      const accessToken = await makeAccessToken()
      const { id } = await Helper.makePlace()
      await request(app)
        .delete(`/api/places/${id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 404 on update place with invalid id', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .delete(`/api/places/${faker.datatype.number()}`)
        .set('x-access-token', accessToken)
        .expect(404)
    })

    test('Should return 403 if patrimony exists', async () => {
      const { placeId } = await Helper.makePatrimony()
      const accessToken = await makeAccessToken()
      await request(app)
        .delete(`/api/places/${placeId}`)
        .set('x-access-token', accessToken)
        .expect(403)
    })
  })
})

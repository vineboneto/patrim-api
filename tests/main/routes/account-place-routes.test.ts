import app from '@/main/config/app'
import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { makeAccessToken } from '@/tests/main/mocks'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import request from 'supertest'

describe('AccountPlace Routes', () => {
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

  describe('POST /users/places', () => {
    test('Should return 200 on add user place', async () => {
      const accessToken = await makeAccessToken()
      const { id } = await Helper.makePlace()
      await request(app)
        .post('/api/users/places')
        .set('x-access-token', accessToken)
        .send({
          placeId: id
        })
        .expect(200)
    })

    test('Should return 403 on add user place without accessToken', async () => {
      const { id } = await Helper.makePlace()
      await request(app)
        .post('/api/users/places')
        .send({
          placeId: id
        })
        .expect(403)
    })
  })
})

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
})

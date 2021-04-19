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
      const accessToken = await makeAccessToken()
      const { id: ownerId } = await Helper.makeOwner()
      const { id: categoryId } = await Helper.makeCategory()
      const { id: placeId } = await Helper.makePlace()
      await request(app)
        .post('/api/patrimonies')
        .set('x-access-token', accessToken)
        .send({
          number: faker.datatype.number().toString(),
          brand: faker.random.word(),
          ownerId,
          categoryId,
          placeId
        })
        .expect(200)
    })
  })
})

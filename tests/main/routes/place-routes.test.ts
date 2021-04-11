import app from '@/main/config/app'
import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { makeAccessToken } from '@/tests/main/mocks'

import { Place, PrismaClient } from '@prisma/client'
import faker from 'faker'
import request from 'supertest'

let prismaClient: PrismaClient

const makePlace = async (): Promise<Place> => {
  const newPlace = await prismaClient.place.create({
    data: {
      name: faker.name.jobArea()
    }
  })
  return newPlace
}

describe('Place Routes', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    await prismaClient.$executeRaw('DELETE FROM "Place";')
    await prismaClient.$executeRaw('ALTER SEQUENCE "Place_id_seq" RESTART WITH 1;')
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    prismaClient = await PrismaHelper.getConnection()
    await prismaClient.$executeRaw('DELETE FROM "Place";')
  })

  describe('POST /places', () => {
    test('Should return 204 on add place', async () => {
      const accessToken = await makeAccessToken(prismaClient)
      await request(app)
        .post('/api/places')
        .set('x-access-token', accessToken)
        .send({
          name: faker.name.jobArea()
        })
        .expect(204)
    })

    test('Should return 403 on add place without accessToken', async () => {
      await request(app)
        .post('/api/places')
        .send({
          name: faker.name.jobArea()
        })
        .expect(403)
    })
  })

  describe('PUT /places', () => {
    test('Should return 204 on save sector', async () => {
      const accessToken = await makeAccessToken(prismaClient)
      const { id } = await makePlace()
      await request(app)
        .put(`/api/places/${id}`)
        .set('x-access-token', accessToken)
        .send({
          name: 'new_value'
        })
        .expect(204)
    })
  })
})

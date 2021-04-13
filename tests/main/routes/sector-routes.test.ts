import app from '@/main/config/app'
import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { makeAccessToken } from '@/tests/main/mocks'
import { mockAddSectorsParams } from '@/tests/data/mocks'

import { PrismaClient, Sector } from '@prisma/client'
import request from 'supertest'
import faker from 'faker'

let prismaClient: PrismaClient

const makeSector = async (): Promise<Sector> => {
  const newSector = await prismaClient.sector.create({
    data: {
      name: faker.name.jobArea()
    }
  })
  return newSector
}

describe('Sector Routes', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    await prismaClient.$executeRaw('DELETE FROM "Sector";')
    await prismaClient.$executeRaw('ALTER SEQUENCE "Sector_id_seq" RESTART WITH 1;')
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    prismaClient = await PrismaHelper.getConnection()
    await prismaClient.$executeRaw('DELETE FROM "Sector";')
  })

  describe('POST /sectors', () => {
    test('Should return 204 on save sector', async () => {
      const accessToken = await makeAccessToken(prismaClient)
      await request(app)
        .post('/api/sectors')
        .set('x-access-token', accessToken)
        .send({
          name: faker.name.jobArea()
        })
        .expect(204)
    })

    test('Should return 403 on save sector without accessToken', async () => {
      await request(app)
        .post('/api/sectors')
        .send({
          name: faker.name.jobArea()
        })
        .expect(403)
    })
  })

  describe('PUT /sectors', () => {
    test('Should return 204 on save sector', async () => {
      const accessToken = await makeAccessToken(prismaClient)
      const newSector = await makeSector()
      await request(app)
        .put(`/api/sectors/${newSector.id}`)
        .set('x-access-token', accessToken)
        .send({
          name: 'new_value'
        })
        .expect(204)
    })

    test('Should return 404 on update sector with invalid id', async () => {
      const accessToken = await makeAccessToken(prismaClient)
      await request(app)
        .put(`/api/sectors/${faker.datatype.number()}`)
        .set('x-access-token', accessToken)
        .send({
          name: 'new_value'
        })
        .expect(404)
    })
  })

  describe('GET /sectors', () => {
    test('Should return empty array', async () => {
      const accessToken = await makeAccessToken(prismaClient)
      await request(app)
        .get('/api/sectors')
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return all sectors', async () => {
      const accessToken = await makeAccessToken(prismaClient)
      await prismaClient.sector.createMany({
        data: mockAddSectorsParams()
      })
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
      const accessToken = await makeAccessToken(prismaClient)
      const newSector = await makeSector()
      await request(app)
        .delete(`/api/sectors/${newSector.id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 404 on update sector with invalid id', async () => {
      const accessToken = await makeAccessToken(prismaClient)
      await request(app)
        .delete(`/api/sectors/${faker.datatype.number()}`)
        .set('x-access-token', accessToken)
        .send({
          name: 'new_value'
        })
        .expect(404)
    })
  })
})

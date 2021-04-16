import app from '@/main/config/app'
import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { makeAccessToken } from '@/tests/main/mocks'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import { PrismaClient } from '@prisma/client'
import request from 'supertest'
import faker from 'faker'

let prismaClient: PrismaClient

describe('Sector Routes', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    await prismaClient.$executeRaw('DELETE FROM "Owner";')
    await prismaClient.$executeRaw('DELETE FROM "Sector";')
    await prismaClient.$executeRaw('ALTER SEQUENCE "Owner_id_seq" RESTART WITH 1;')
    await prismaClient.$executeRaw('ALTER SEQUENCE "Sector_id_seq" RESTART WITH 1;')
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    prismaClient = await PrismaHelper.getConnection()
    await prismaClient.$executeRaw('DELETE FROM "Sector";')
  })

  describe('POST /sectors', () => {
    test('Should return 204 on save sector', async () => {
      const accessToken = await makeAccessToken()
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
      const accessToken = await makeAccessToken()
      const { id } = await Helper.makeSector()
      await request(app)
        .put(`/api/sectors/${id}`)
        .set('x-access-token', accessToken)
        .send({
          name: 'new_value'
        })
        .expect(204)
    })

    test('Should return 404 on update sector with invalid id', async () => {
      const accessToken = await makeAccessToken()
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
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/sectors')
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return all sectors', async () => {
      const accessToken = await makeAccessToken()
      await Helper.makeManySectors()
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
      const accessToken = await makeAccessToken()
      const { id } = await Helper.makeSector()
      await request(app)
        .delete(`/api/sectors/${id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 404 on update sector with invalid id', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .delete(`/api/sectors/${faker.datatype.number()}`)
        .set('x-access-token', accessToken)
        .expect(404)
    })

    test('Should return 403 if owners exists', async () => {
      const { sectorId } = await Helper.makeOwner()
      const accessToken = await makeAccessToken()
      await request(app)
        .delete(`/api/sectors/${sectorId}`)
        .set('x-access-token', accessToken)
        .expect(403)
    })
  })
})

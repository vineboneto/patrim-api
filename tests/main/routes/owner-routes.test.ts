import app from '@/main/config/app'
import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { makeAccessToken } from '@/tests/main/mocks'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import { PrismaClient } from '@prisma/client'
import request from 'supertest'
import faker from 'faker'

let prismaClient: PrismaClient

describe('Owner Routes', () => {
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
    prismaClient = PrismaHelper.getConnection()
    await prismaClient.$executeRaw('DELETE FROM "Owner";')
  })

  describe('POST /owners', () => {
    test('Should return 204 on save owner', async () => {
      const accessToken = await makeAccessToken(prismaClient)
      const { id: sectorId } = await Helper.makeSector()
      await request(app)
        .post('/api/owners')
        .set('x-access-token', accessToken)
        .send({
          name: faker.name.findName(),
          sectorId
        })
        .expect(200)
    })

    test('Should return 403 on save owner without accessToken', async () => {
      const { id: sectorId } = await Helper.makeSector()
      await request(app)
        .post('/api/owners')
        .send({
          name: faker.name.jobArea(),
          sectorId
        })
        .expect(403)
    })
  })

  describe('PUT /owners', () => {
    test('Should return 204 on update owner', async () => {
      const accessToken = await makeAccessToken(prismaClient)
      const { id, sectorId } = await Helper.makeOwner()
      await request(app)
        .put(`/api/owners/${id}`)
        .set('x-access-token', accessToken)
        .send({
          name: 'new_value',
          sectorId
        })
        .expect(200)
    })

    test('Should return 404 on update owner with invalid id', async () => {
      const accessToken = await makeAccessToken(prismaClient)
      const { id: sectorId } = await Helper.makeSector()
      await request(app)
        .put(`/api/owners/${faker.datatype.number()}`)
        .set('x-access-token', accessToken)
        .send({
          name: 'new_value',
          sectorId
        })
        .expect(404)
    })

    describe('GET /owners', () => {
      test('Should return 200 on load owners', async () => {
        const accessToken = await makeAccessToken(prismaClient)
        await Helper.makeManyOwners()
        await request(app)
          .get('/api/owners')
          .set('x-access-token', accessToken)
          .expect(200)
      })

      test('Should return 200 on load owners', async () => {
        const accessToken = await makeAccessToken(prismaClient)
        await Helper.makeManyOwners()
        await request(app)
          .get('/api/owners?take=5&skip=3')
          .set('x-access-token', accessToken)
          .expect(200)
      })

      test('Should return 204 on load owner return empty array', async () => {
        const accessToken = await makeAccessToken(prismaClient)
        await request(app)
          .get('/api/owners')
          .set('x-access-token', accessToken)
          .expect(204)
      })
    })

    describe('DELETE /owners', () => {
      test('Should return owner deleted on success', async () => {
        const { id } = await Helper.makeOwner()
        const accessToken = await makeAccessToken(prismaClient)
        await request(app)
          .delete(`/api/owners/${id}`)
          .set('x-access-token', accessToken)
          .expect(200)
      })

      test('Should return 403 if patrimony exists', async () => {
        const { ownerId } = await Helper.makePatrimony()
        const accessToken = await makeAccessToken(prismaClient)
        await request(app)
          .delete(`/api/owners/${ownerId}`)
          .set('x-access-token', accessToken)
          .expect(403)
      })
    })
  })
})

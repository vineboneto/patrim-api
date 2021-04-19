import app from '@/main/config/app'
import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { makeAccessToken } from '@/tests/main/mocks'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import request from 'supertest'
import faker from 'faker'

describe('Owner Routes', () => {
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

  describe('POST /owners', () => {
    test('Should return 200 on add owner', async () => {
      const accessToken = await makeAccessToken()
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

    test('Should return 403 on add owner without accessToken', async () => {
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
    test('Should return 200 on update owner', async () => {
      const accessToken = await makeAccessToken()
      const { id, sector } = await Helper.makeOwner()
      await request(app)
        .put(`/api/owners/${id}`)
        .set('x-access-token', accessToken)
        .send({
          name: 'new_value',
          sectorId: sector.id
        })
        .expect(200)
    })

    test('Should return 404 on update owner with invalid id', async () => {
      const accessToken = await makeAccessToken()
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
        const accessToken = await makeAccessToken()
        await Helper.makeManyOwners()
        await request(app)
          .get('/api/owners')
          .set('x-access-token', accessToken)
          .expect(200)
      })

      test('Should return 200 on load owners with take and skip', async () => {
        const accessToken = await makeAccessToken()
        await Helper.makeManyOwners()
        await request(app)
          .get('/api/owners?take=3&skip=0')
          .set('x-access-token', accessToken)
          .expect(200)
      })

      test('Should return 204 on load owner return empty array', async () => {
        const accessToken = await makeAccessToken()
        await request(app)
          .get('/api/owners')
          .set('x-access-token', accessToken)
          .expect(204)
      })
    })

    describe('DELETE /owners', () => {
      test('Should return owner deleted on success', async () => {
        const { id } = await Helper.makeOwner()
        const accessToken = await makeAccessToken()
        await request(app)
          .delete(`/api/owners/${id}`)
          .set('x-access-token', accessToken)
          .expect(200)
      })

      test('Should return 403 if patrimony exists', async () => {
        const { owner } = await Helper.makePatrimony()
        const accessToken = await makeAccessToken()
        await request(app)
          .delete(`/api/owners/${owner.id}`)
          .set('x-access-token', accessToken)
          .expect(403)
      })
    })
  })
})

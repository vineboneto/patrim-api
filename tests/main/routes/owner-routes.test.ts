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
      const { accessToken, accountId } = await makeAccessToken()
      const { id: sectorId } = await Helper.makeSector(null, accountId)
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
      const { id, Sector, userId } = await Helper.makeOwner()
      const { accessToken } = await makeAccessToken(userId)
      await request(app)
        .put(`/api/owners/${id}`)
        .set('x-access-token', accessToken)
        .send({
          name: 'new_value',
          sectorId: Sector.id
        })
        .expect(200)
    })
    test('Should return 200 on update owner', async () => {
      const { accessToken } = await makeAccessToken()
      const { id, Sector } = await Helper.makeOwner()
      await request(app)
        .put(`/api/owners/${id}`)
        .set('x-access-token', accessToken)
        .send({
          name: 'new_value',
          sectorId: Sector.id
        })
        .expect(403)
    })
  })

  describe('GET /owners', () => {
    test('Should return 200 on load owners', async () => {
      const owners = await Helper.makeManyOwners()
      const { accessToken } = await makeAccessToken(owners[0].userId)
      await request(app)
        .get('/api/owners')
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 200 on load owners with take and skip', async () => {
      const owners = await Helper.makeManyOwners()
      const { accessToken } = await makeAccessToken(owners[0].userId)
      await request(app)
        .get('/api/owners?take=3&skip=0')
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 204 on load owner return empty array', async () => {
      const { accessToken } = await makeAccessToken()
      await request(app)
        .get('/api/owners')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })

  describe('GET /owners/:id', () => {
    test('Should return 204 if category not exist', async () => {
      const { accessToken } = await makeAccessToken()
      await request(app)
        .get(`/api/owners/${faker.datatype.number()}`)
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return 204 if category is other user', async () => {
      const { userId } = await Helper.makeSector()
      const { accessToken } = await makeAccessToken(userId)
      const { id } = await Helper.makeOwner()
      await request(app)
        .get(`/api/owners/${id}`)
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return 200 on success', async () => {
      const { id, userId } = await Helper.makeOwner()
      const { accessToken } = await makeAccessToken(userId)
      await request(app)
        .get(`/api/owners/${id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 403 on load without accessToken', async () => {
      const { id } = await Helper.makeOwner()
      await request(app)
        .get(`/api/owners/${id}`)
        .expect(403)
    })
  })

  describe('GET /owners/:id/patrimonies', () => {
    test('Should return 200 on load patrimonies by owner id', async () => {
      const patrimonies = await Helper.makeManyPatrimonies()
      const { accessToken } = await makeAccessToken(patrimonies[0].userId)
      await request(app)
        .get(`/api/owners/${patrimonies[0].id}/patrimonies`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 200 on load patrimonies by load ownerId with take and skip', async () => {
      const patrimonies = await Helper.makeManyPatrimonies()
      const { accessToken } = await makeAccessToken(patrimonies[0].userId)
      await request(app)
        .get(`/api/owners/${patrimonies[0].id}/patrimonies?take=2&skip=0`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 204 on load by ownerId return empty array', async () => {
      const { accessToken } = await makeAccessToken()
      await request(app)
        .get(`/api/owners/${faker.datatype.number()}/patrimonies`)
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })

  describe('DELETE /owners', () => {
    test('Should return owner deleted on success', async () => {
      const { id, userId } = await Helper.makeOwner()
      const { accessToken } = await makeAccessToken(userId)
      await request(app)
        .delete(`/api/owners/${id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return owner deleted on success', async () => {
      const { id } = await Helper.makeOwner()
      const { id: userId } = await Helper.makeUser()
      const { accessToken } = await makeAccessToken(userId)
      await request(app)
        .delete(`/api/owners/${id}`)
        .set('x-access-token', accessToken)
        .expect(403)
    })
  })
})

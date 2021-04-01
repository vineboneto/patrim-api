import app from '@/main/config/app'
import { PrismaHelper } from '@/infra/db/postgres-prisma'
import env from '@/main/config/env'

import { PrismaClient } from '@prisma/client'
import request from 'supertest'
import faker from 'faker'
import { sign } from 'jsonwebtoken'

let prismaClient: PrismaClient

const makeAccessToken = async (): Promise<string> => {
  const name = faker.name.findName()
  const email = faker.internet.email()
  const password = faker.internet.password()
  const { id } = await prismaClient.user.create({
    data: {
      name,
      email,
      password
    }
  })
  const accessToken = sign({ id }, env.jwtSecret)
  await prismaClient.user.update({
    where: {
      id
    },
    data: {
      accessToken
    }
  })
  return accessToken
}

describe('Sector Routes', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    await prismaClient.$executeRaw('DELETE FROM "Sector";')
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    prismaClient = await PrismaHelper.getConnection()
    await prismaClient.$executeRaw('ALTER SEQUENCE "Sector_id_seq" RESTART WITH 1;')
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
  })
})

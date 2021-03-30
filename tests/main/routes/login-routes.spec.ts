import app from '@/main/config/app'
import { PrismaHelper } from '@/infra/db/postgres-prisma'

import { PrismaClient } from '@prisma/client'
import request from 'supertest'
import faker from 'faker'

let prismaClient: PrismaClient

describe('Login Routes', () => {
  describe('POST /signup', () => {
    beforeAll(() => {
      PrismaHelper.connect()
    })

    afterAll(async () => {
      await PrismaHelper.disconnect()
    })

    beforeEach(async () => {
      prismaClient = await PrismaHelper.getConnection()
      await prismaClient.$executeRaw('ALTER SEQUENCE "User_id_seq" RESTART WITH 1;')
      await prismaClient.$executeRaw('DELETE FROM "User";')
    })

    test('Should return badRequest if same required data not provided', async () => {
      const password = faker.internet.password()
      await request(app)
        .post('/api/signup')
        .send({
          email: faker.internet.email(),
          password,
          passwordConfirmation: password
        })
        .expect(400)
    })

    test('Should return 200 on signup', async () => {
      const password = faker.internet.password()
      await request(app)
        .post('/api/signup')
        .send({
          name: faker.name.findName(),
          email: faker.internet.email(),
          password,
          passwordConfirmation: password
        })
        .expect(200)
    })
  })
})

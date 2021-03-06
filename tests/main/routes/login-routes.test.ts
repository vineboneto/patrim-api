import app from '@/main/config/app'
import { PrismaHelper } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import { PrismaClient } from '@prisma/client'
import request from 'supertest'
import { hash } from 'bcrypt'
import faker from 'faker'

let prismaClient: PrismaClient

describe('Login Routes', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    await Helper.deleteAll()
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    prismaClient = PrismaHelper.getConnection()
    await Helper.deleteAll()
  })

  describe('POST /signup', () => {
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

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const email = faker.internet.email()
      const password = faker.internet.password()
      const hashedPassword = await hash(password, 12)
      await prismaClient.user.create({
        data: {
          name: faker.name.findName(),
          email,
          password: hashedPassword
        }
      })
      await request(app)
        .post('/api/login')
        .send({
          email,
          password
        })
        .expect(200)
    })

    test('Should return 401 on credentials are invalid', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: faker.internet.email(),
          password: faker.internet.password()
        })
        .expect(401)
    })
  })
})

import { AccountPostgresRepository, PrismaHelper } from '@/infra/db/postgres-prisma'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import { PrismaClient } from '@prisma/client'
import faker from 'faker'

let prismaClient: PrismaClient

const makeSut = (): AccountPostgresRepository => new AccountPostgresRepository()

describe('AccountPostgresRepository', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    await prismaClient.$executeRaw('DELETE FROM "User";')
    await prismaClient.$executeRaw('ALTER SEQUENCE "User_id_seq" RESTART WITH 1;')
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    prismaClient = PrismaHelper.getConnection()
    await prismaClient.$executeRaw('DELETE FROM "User";')
  })

  describe('add()', () => {
    test('Should return true on add success', async () => {
      const sut = makeSut()
      const isValid = await sut.add(mockAddAccountParams())
      expect(isValid).toBe(true)
    })
  })

  describe('checkByEmail()', () => {
    test('Should return an true if email exists', async () => {
      const sut = makeSut()
      const { email } = await Helper.makeUser()
      const exists = await sut.checkByEmail(email)
      expect(exists).toBe(true)
    })

    test('Should return an false if email not exists', async () => {
      const sut = makeSut()
      const exists = await sut.checkByEmail(faker.internet.email())
      expect(exists).toBe(false)
    })
  })

  describe('loadByEmail', () => {
    test('Should returns account on loadByEmail success', async () => {
      const sut = makeSut()
      const { email } = await Helper.makeUser()
      const account = await sut.loadByEmail(email)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBeTruthy()
      expect(account.password).toBeTruthy()
    })

    test('Should returns null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail(faker.internet.email())
      expect(account).toBeNull()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut()
      const { id } = await Helper.makeUser()
      const token = faker.datatype.uuid()
      await sut.updateAccessToken(id, token)
      const accountWithAccessTokenUpdated = await Helper.findUserById(id)
      expect(accountWithAccessTokenUpdated.accessToken).toBe(token)
    })
  })

  describe('loadByToken', () => {
    let name: string
    let email: string
    let password: string
    let accessToken: string

    beforeEach(() => {
      name = faker.name.findName()
      email = faker.internet.email()
      password = faker.internet.password()
      accessToken = faker.datatype.uuid()
    })

    test('Should returns an account without role', async () => {
      const sut = makeSut()
      await prismaClient.user.create({
        data: {
          name,
          email,
          password,
          accessToken
        }
      })
      const account = await sut.loadByToken(accessToken)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    test('Should return an account on loadByToken with admin role', async () => {
      const sut = makeSut()
      await prismaClient.user.create({
        data: {
          name,
          email,
          password,
          accessToken,
          role: 'admin'
        }
      })
      const account = await sut.loadByToken(accessToken, 'admin')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    test('Should return null account on loadByToken with invalid role', async () => {
      const sut = makeSut()
      await prismaClient.user.create({
        data: {
          name,
          email,
          password,
          accessToken
        }
      })
      const account = await sut.loadByToken(accessToken, 'admin')
      expect(account).toBeFalsy()
    })

    test('Should return an account on loadByToken with user is admin', async () => {
      const sut = makeSut()
      await prismaClient.user.create({
        data: {
          name,
          email,
          password,
          accessToken,
          role: 'admin'
        }
      })
      const account = await sut.loadByToken(accessToken)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    test('Should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken(faker.datatype.uuid())
      expect(account).toBeFalsy()
    })
  })
})

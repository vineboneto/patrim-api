import { PlacePostgresRepository, PrismaHelper } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import { PrismaClient } from '@prisma/client'
import faker from 'faker'

const makeSut = (): PlacePostgresRepository => new PlacePostgresRepository()

let prismaClient: PrismaClient

describe('PlacePostgresRepository', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    await prismaClient.$executeRaw('DELETE FROM "Place";')
    await prismaClient.$executeRaw('ALTER SEQUENCE "Place_id_seq" RESTART WITH 1;')
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    prismaClient = PrismaHelper.getConnection()
    await prismaClient.$executeRaw('DELETE FROM "Place";')
  })

  describe('add()', () => {
    test('Should return true on add new place with userId success', async () => {
      const sut = makeSut()
      const { id } = await Helper.makeUser()
      const result = await sut.add({
        name: 'any_name',
        userId: id.toString()
      })
      expect(result).toBe(true)
    })

    test('Should return true on add new place without userId success', async () => {
      const sut = makeSut()
      const result = await sut.add({
        name: 'any_name'
      })
      expect(result).toBe(true)
    })
  })

  describe('update()', () => {
    test('Should return true on update data with userId success', async () => {
      const sut = makeSut()
      const { id: userId } = await Helper.makeUser()
      const { id } = await Helper.makePlace({ userId: userId.toString(), name: 'any_place' })
      const { id: newUserId } = await Helper.makeUser()
      const result = await sut.update({
        id: id.toString(),
        name: 'other_place',
        userId: newUserId.toString()
      })
      const { name: newName, userId: newUserIdUpdated } = await Helper.findPlaceById(id)
      expect(result).toBe(true)
      expect(newName).toBe('other_place')
      expect(newUserIdUpdated).toBe(newUserId)
    })

    test('Should return true on update data without userId success', async () => {
      const sut = makeSut()
      const { id } = await Helper.makePlace({ name: faker.name.findName() })
      const result = await sut.update({
        id: id.toString(),
        name: 'other_name'
      })
      const { name: newName } = await Helper.findPlaceById(id)
      expect(result).toBe(true)
      expect(newName).toBe('other_name')
    })
  })

  describe('checkById()', () => {
    test('Should return sector on success', async () => {
      const sut = makeSut()
      const { id } = await Helper.makePlace({ name: faker.name.findName() })
      const result = await sut.checkById(id.toString())
      expect(result).toBe(true)
    })

    test('Should return false if sector not exists', async () => {
      const sut = makeSut()
      const result = await sut.checkById(faker.datatype.number().toString())
      expect(result).toBe(false)
    })
  })

  describe('checkByName()', () => {
    test('Should return true if sector name exists', async () => {
      const sut = makeSut()
      const { name } = await Helper.makePlace({ name: faker.name.findName() })
      const isValid = await sut.checkByName(name)
      expect(isValid).toBe(true)
    })

    test('Should return false if sector name does not exists', async () => {
      const sut = makeSut()
      const isValid = await sut.checkByName(faker.name.findName())
      expect(isValid).toBe(false)
    })
  })

  describe('loadAll()', () => {
    test('Should returns all places on success', async () => {
      const sut = makeSut()
      const { id: userId } = await Helper.makeUser()
      await prismaClient.place.createMany({
        data: [
          {
            name: faker.name.findName(),
            userId
          },
          {
            name: faker.name.findName(),
            userId
          },
          {
            name: faker.name.findName()
          }
        ]
      })
      const places = await sut.loadAll()
      expect(places).toBeTruthy()
      expect(places.length).toBe(3)
    })

    test('Should returns empty array if places not exists', async () => {
      const sut = makeSut()
      const places = await sut.loadAll()
      expect(places).toEqual([])
    })
  })
})

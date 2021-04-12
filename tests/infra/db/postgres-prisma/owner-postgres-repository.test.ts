import { OwnerPostgresRepository, PrismaHelper } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import { PrismaClient } from '@prisma/client'

import faker from 'faker'

const makeSut = (): OwnerPostgresRepository => new OwnerPostgresRepository()

let prismaClient: PrismaClient

describe('OwnerPostgresRepository', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    await prismaClient.$executeRaw('DELETE FROM "Owner";')
    await prismaClient.$executeRaw('ALTER SEQUENCE "Owner_id_seq" RESTART WITH 1;')
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    prismaClient = PrismaHelper.getConnection()
    await prismaClient.$executeRaw('DELETE FROM "Owner";')
  })

  describe('add()', () => {
    test('Should return owner on add success', async () => {
      const sut = makeSut()
      const { id: sectorId } = await Helper.makeSector()
      const name = faker.name.findName()
      const owner = await sut.add({ name, sectorId: sectorId.toString() })
      expect(owner).toBeTruthy()
      expect(owner.id).toBeTruthy()
      expect(owner.name).toBe(name)
      expect(owner.sectorId).toBe(sectorId.toString())
    })
  })
})

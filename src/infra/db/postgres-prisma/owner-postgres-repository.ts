import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { AddOwnerRepository, CheckOwnerByIdRepository, UpdateOwnerRepository } from '@/data/protocols'

export class OwnerPostgresRepository implements AddOwnerRepository, UpdateOwnerRepository, CheckOwnerByIdRepository {
  async add (owner: AddOwnerRepository.Params): Promise<AddOwnerRepository.Model> {
    const { name, sectorId } = owner
    const prismaClient = PrismaHelper.getConnection()
    const ownerModel = await prismaClient.owner.create({
      data: {
        name,
        sectorId: Number(sectorId)
      }
    })
    return ownerModel
  }

  async update (owner: UpdateOwnerRepository.Params): Promise<UpdateOwnerRepository.Model> {
    const { id, name, sectorId } = owner
    const prismaClient = PrismaHelper.getConnection()
    const ownerModel = await prismaClient.owner.update({
      where: {
        id: Number(id)
      },
      data: {
        name,
        sectorId: Number(sectorId)
      }
    })
    return ownerModel
  }

  async checkById (id: string | number): Promise<CheckOwnerByIdRepository.Result> {
    const prismaClient = PrismaHelper.getConnection()
    const ownerId = Number(id)
    if (ownerId) {
      const ownerWithOnlyId = await prismaClient.owner.findFirst({
        where: {
          id: Number(id)
        },
        select: {
          id: true
        }
      })
      return ownerWithOnlyId !== null
    }
    return false
  }
}

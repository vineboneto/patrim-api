import { PrismaHelper } from '@/infra/db/postgres-prisma'
import {
  AddOwnerRepository,
  CheckOwnerByIdRepository,
  DeleteOwnerRepository,
  LoadOwnersRepository,
  UpdateOwnerRepository
} from '@/data/protocols'

export class OwnerPostgresRepository implements
  AddOwnerRepository,
  UpdateOwnerRepository,
  CheckOwnerByIdRepository,
  LoadOwnersRepository,
  DeleteOwnerRepository {
  async add (owner: AddOwnerRepository.Params): Promise<AddOwnerRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const { name, sectorId } = owner
    const ownerModel = await prismaClient.owner.create({
      data: {
        name,
        sectorId: Number(sectorId)
      }
    })
    return ownerModel
  }

  async update (owner: UpdateOwnerRepository.Params): Promise<UpdateOwnerRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const { id, name, sectorId } = owner
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

  async delete (params: DeleteOwnerRepository.Params): Promise<DeleteOwnerRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const { id } = params
    const ownerDeleted = await prismaClient.owner.delete({
      where: {
        id: Number(id)
      }
    })
    return ownerDeleted
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

  async loadAll (params: LoadOwnersRepository.Params): Promise<LoadOwnersRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const { skip, take } = params
    if (isNaN(skip) && isNaN(take)) {
      return await prismaClient.owner.findMany()
    }
    return await prismaClient.owner.findMany({
      skip,
      take
    })
  }
}

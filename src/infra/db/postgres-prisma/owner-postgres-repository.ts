import { PrismaHelper } from '@/infra/db/postgres-prisma'
import {
  AddOwnerRepository,
  CheckOwnerByIdRepository,
  CheckOwnerBySectorIdRepository,
  DeleteOwnerRepository,
  LoadOwnersRepository,
  UpdateOwnerRepository
} from '@/data/protocols'

export class OwnerPostgresRepository implements
  AddOwnerRepository,
  UpdateOwnerRepository,
  CheckOwnerByIdRepository,
  LoadOwnersRepository,
  DeleteOwnerRepository,
  CheckOwnerBySectorIdRepository {
  async add (owner: AddOwnerRepository.Params): Promise<AddOwnerRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const { name, sectorId, accountId } = owner
    const ownerModel: any = await prismaClient.owner.create({
      data: {
        name,
        sectorId: Number(sectorId),
        userId: Number(accountId)
      },
      include: { Sector: true }
    })
    return PrismaHelper.adaptOwner(ownerModel)
  }

  async update (owner: UpdateOwnerRepository.Params): Promise<UpdateOwnerRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const { id, name, sectorId } = owner
    const ownerModel: any = await prismaClient.owner.update({
      where: {
        id: Number(id)
      },
      data: {
        name,
        sectorId: Number(sectorId)
      },
      include: { Sector: true }
    })
    return PrismaHelper.adaptOwner(ownerModel)
  }

  async delete (params: DeleteOwnerRepository.Params): Promise<DeleteOwnerRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const { id } = params
    const ownerDeleted: any = await prismaClient.owner.delete({
      where: {
        id: Number(id)
      },
      include: { Sector: true }
    })
    return PrismaHelper.adaptOwner(ownerDeleted)
  }

  async checkById (params: CheckOwnerByIdRepository.Params): Promise<CheckOwnerByIdRepository.Result> {
    const prismaClient = PrismaHelper.getConnection()
    const { id } = params
    const ownerWithOnlyId = await prismaClient.owner.findFirst({
      where: {
        id: Number(id)
      },
      include: { Sector: true }
    })
    return ownerWithOnlyId !== null
  }

  async loadAll (params: LoadOwnersRepository.Params): Promise<LoadOwnersRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const { skip, take, accountId } = params
    const where = {
      userId: Number(accountId)
    }
    let owners: any
    if (isNaN(skip) || isNaN(take)) {
      owners = await prismaClient.owner.findMany({
        include: { Sector: true },
        where
      })
    } else {
      owners = await prismaClient.owner.findMany({
        skip: Number(skip),
        take: Number(take),
        include: { Sector: true },
        where
      })
    }
    const count = await prismaClient.owner.count({ where })
    return {
      model: owners.map(owner => PrismaHelper.adaptOwner(owner)),
      count
    }
  }

  async checkBySectorId (params: CheckOwnerBySectorIdRepository.Params): Promise<CheckOwnerBySectorIdRepository.Result> {
    const prismaClient = PrismaHelper.getConnection()
    const { sectorId } = params
    const sectorWithOnlyId = await prismaClient.owner.findFirst({
      where: {
        sectorId: Number(sectorId)
      },
      select: { id: true }
    })
    return sectorWithOnlyId !== null
  }
}

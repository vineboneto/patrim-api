import { PrismaHelper } from '@/infra/db/postgres-prisma'
import {
  AddOwnerRepository,
  CheckOwnerByIdRepository,
  CheckOwnerBySectorIdRepository,
  DeleteOwnerRepository,
  LoadOwnersRepository,
  UpdateOwnerRepository
} from '@/data/protocols'
import { Owner } from '@prisma/client'

export class OwnerPostgresRepository implements
  AddOwnerRepository,
  UpdateOwnerRepository,
  CheckOwnerByIdRepository,
  LoadOwnersRepository,
  DeleteOwnerRepository,
  CheckOwnerBySectorIdRepository {
  async add (owner: AddOwnerRepository.Params): Promise<AddOwnerRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const { name, sectorId } = owner
    const ownerModel = await prismaClient.owner.create({
      data: {
        name,
        sectorId: Number(sectorId)
      },
      include: {
        Sector: true
      }
    })
    return this.adapt(ownerModel)
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
      },
      include: {
        Sector: true
      }
    })
    return this.adapt(ownerModel)
  }

  async delete (params: DeleteOwnerRepository.Params): Promise<DeleteOwnerRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const { id } = params
    const ownerDeleted = await prismaClient.owner.delete({
      where: {
        id: Number(id)
      },
      include: {
        Sector: true
      }
    })
    return this.adapt(ownerDeleted)
  }

  async checkById (params: CheckOwnerByIdRepository.Params): Promise<CheckOwnerByIdRepository.Result> {
    const prismaClient = PrismaHelper.getConnection()
    const { id } = params
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

  async loadAll (params: LoadOwnersRepository.Params): Promise<LoadOwnersRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const { skip, take } = params
    let owners: Owner[]
    if (isNaN(skip) || isNaN(take)) {
      owners = await prismaClient.owner.findMany({
        include: {
          Sector: true
        }
      })
    } else {
      owners = await prismaClient.owner.findMany({
        skip: Number(skip),
        take: Number(take),
        include: {
          Sector: true
        }
      })
    }
    return owners.map(owner => this.adapt(owner))
  }

  async checkBySectorId (params: CheckOwnerBySectorIdRepository.Params): Promise<CheckOwnerBySectorIdRepository.Result> {
    const prismaClient = PrismaHelper.getConnection()
    const { sectorId } = params
    const sectorWithOnlyId = await prismaClient.owner.findFirst({
      where: {
        sectorId: Number(sectorId)
      },
      select: {
        id: true
      }
    })
    return sectorWithOnlyId !== null
  }

  private adapt (ownerModel: any): any {
    return {
      id: ownerModel.id,
      name: ownerModel.name,
      sector: {
        id: ownerModel.Sector.id,
        name: ownerModel.Sector.name
      }
    }
  }
}

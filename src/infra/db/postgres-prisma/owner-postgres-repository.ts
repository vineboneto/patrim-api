import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { AddOwnerRepository, UpdateOwnerRepository } from '@/data/protocols'

export class OwnerPostgresRepository implements AddOwnerRepository, UpdateOwnerRepository {
  async add (owner: AddOwnerRepository.Params): Promise<AddOwnerRepository.Model> {
    const { name, sectorId } = owner
    const prismaClient = PrismaHelper.getConnection()
    const ownerModel = await prismaClient.owner.create({
      data: {
        name,
        sectorId: Number(sectorId)
      }
    })
    return this.convertIdToString(ownerModel)
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
    return this.convertIdToString(ownerModel)
  }

  private convertIdToString (entity: any): any {
    return {
      ...entity,
      sectorId: entity.sectorId ? entity.sectorId.toString() : null,
      id: entity.id.toString()
    }
  }
}

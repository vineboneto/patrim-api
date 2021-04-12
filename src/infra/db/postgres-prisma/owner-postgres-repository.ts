import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { AddOwnerRepository } from '@/data/protocols'

export class OwnerPostgresRepository implements AddOwnerRepository {
  async add (owner: AddOwnerRepository.Params): Promise<AddOwnerRepository.Model> {
    const { name, sectorId } = owner
    const prismaClient = PrismaHelper.getConnection()
    const ownerModel = await prismaClient.owner.create({
      data: {
        name,
        sectorId: Number(sectorId)
      }
    })
    return {
      ...ownerModel,
      id: ownerModel.id.toString(),
      sectorId: ownerModel.sectorId.toString()
    }
  }
}

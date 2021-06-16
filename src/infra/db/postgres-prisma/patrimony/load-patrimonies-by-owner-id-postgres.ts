import { PatrimonyHelper } from '@/infra/db/postgres-prisma'
import { LoadPatrimoniesByOwnerIdRepository } from '@/data/protocols'

export class LoadPatrimoniesByOwnerIdPostgres implements LoadPatrimoniesByOwnerIdRepository {
  async loadByOwnerId (params: LoadPatrimoniesByOwnerIdRepository.Params):
  Promise<LoadPatrimoniesByOwnerIdRepository.Model> {
    const where = {
      ownerId: Number(params.ownerId),
      userId: Number(params.accountId)
    }
    return Promise.resolve(PatrimonyHelper.loadPatrimoniesWhere(where, params.skip, params.take))
  }
}

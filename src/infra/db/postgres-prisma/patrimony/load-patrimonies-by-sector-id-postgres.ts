import { PatrimonyHelper } from '@/infra/db/postgres-prisma'
import { LoadPatrimoniesBySectorIdRepository } from '@/data/protocols'

export class LoadPatrimoniesBySectorIdPostgres implements LoadPatrimoniesBySectorIdRepository {
  async loadBySectorId (params: LoadPatrimoniesBySectorIdRepository.Params):
  Promise<LoadPatrimoniesBySectorIdRepository.Model> {
    const where = {
      Owner: {
        sectorId: Number(params.sectorId)
      },
      userId: Number(params.accountId)
    }
    return Promise.resolve(PatrimonyHelper.loadPatrimoniesWhere(where, params.skip, params.take))
  }
}

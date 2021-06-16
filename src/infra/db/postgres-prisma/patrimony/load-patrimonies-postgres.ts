import { PatrimonyHelper } from '@/infra/db/postgres-prisma'
import { LoadPatrimoniesRepository } from '@/data/protocols'

export class LoadPatrimoniesPostgres implements LoadPatrimoniesRepository {
  async loadAll (params: LoadPatrimoniesRepository.Params): Promise<LoadPatrimoniesRepository.Model> {
    const { skip, take, accountId } = params
    const where = {
      userId: Number(accountId)
    }
    return Promise.resolve(PatrimonyHelper.loadPatrimoniesWhere(where, skip, take))
  }
}

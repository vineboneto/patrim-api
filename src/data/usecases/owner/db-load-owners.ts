import { LoadOwners } from '@/domain/usecases'
import { LoadOwnersRepository } from '@/data/protocols'

export class DbLoadOwners implements LoadOwners {
  constructor (
    private readonly loadOwnersRepository: LoadOwnersRepository
  ) {}

  async load (params: LoadOwners.Params): Promise<LoadOwners.Model> {
    return this.loadOwnersRepository.loadAll(params)
  }
}

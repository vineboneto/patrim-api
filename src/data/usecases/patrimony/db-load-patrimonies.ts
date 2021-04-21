import { LoadPatrimonies } from '@/domain/usecases'
import { LoadPatrimoniesRepository } from '@/data/protocols'

export class DbLoadPatrimonies implements LoadPatrimonies {
  constructor (
    private readonly loadPatrimoniesRepository: LoadPatrimoniesRepository
  ) {}

  async load (params: LoadPatrimonies.Params): Promise<LoadPatrimonies.Model> {
    return this.loadPatrimoniesRepository.loadAll(params)
  }
}

import { LoadPatrimoniesBySectorId } from '@/domain/usecases'
import { LoadPatrimoniesBySectorIdRepository } from '@/data/protocols'

export class DbLoadPatrimoniesBySectorId implements LoadPatrimoniesBySectorId {
  constructor (
    private readonly loadPatrimoniesBySectorIdRepository: LoadPatrimoniesBySectorIdRepository
  ) {}

  async loadBySectorId (params: LoadPatrimoniesBySectorId.Params): Promise<LoadPatrimoniesBySectorId.Model> {
    return this.loadPatrimoniesBySectorIdRepository.loadBySectorId(params)
  }
}

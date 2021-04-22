import { LoadPatrimoniesByCategoryId } from '@/domain/usecases'
import { LoadPatrimoniesByCategoryIdRepository } from '@/data/protocols'

export class DbLoadPatrimoniesByCategoryId implements LoadPatrimoniesByCategoryId {
  constructor (
    private readonly loadPatrimoniesByCategoryIdRepository: LoadPatrimoniesByCategoryIdRepository
  ) {}

  async loadByCategoryId (params: LoadPatrimoniesByCategoryId.Params): Promise<LoadPatrimoniesByCategoryId.Model> {
    return this.loadPatrimoniesByCategoryIdRepository.loadByCategoryId(params)
  }
}

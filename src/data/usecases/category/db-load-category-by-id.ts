import { LoadCategoryById } from '@/domain/usecases'
import { LoadCategoryByIdRepository } from '@/data/protocols'

export class DbLoadCategoryById implements LoadCategoryById {
  constructor (
    private readonly loadCategoryByIdRepository: LoadCategoryByIdRepository
  ) {}

  async loadById (params: LoadCategoryById.Params): Promise<LoadCategoryById.Model> {
    return this.loadCategoryByIdRepository.loadById(params)
  }
}

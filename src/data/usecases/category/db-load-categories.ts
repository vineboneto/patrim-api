import { LoadCategories } from '@/domain/usecases'
import { LoadCategoriesRepository } from '@/data/protocols'

export class DbLoadCategories implements LoadCategories {
  constructor (
    private readonly loadCategoriesRepository: LoadCategoriesRepository
  ) {}

  async load (params: LoadCategories.Params): Promise<LoadCategories.Model> {
    return this.loadCategoriesRepository.loadAll(params)
  }
}

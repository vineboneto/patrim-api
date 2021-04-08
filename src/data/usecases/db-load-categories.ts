import { LoadCategories } from '@/domain/usecases'
import { LoadCategoriesRepository } from '@/data/protocols'

export class DbLoadCategories implements LoadCategories {
  constructor (
    private readonly loadCategoriesRepository: LoadCategoriesRepository
  ) {}

  async load (): Promise<LoadCategories.Model> {
    await this.loadCategoriesRepository.loadAll()
    return null
  }
}

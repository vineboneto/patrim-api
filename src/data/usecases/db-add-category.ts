import { AddCategory } from '@/domain/usecases/add-category'
import { AddCategoryRepository } from '@/data/protocols/add-category-repository'

export class DbAddCategory implements AddCategory {
  constructor (private readonly addCategoryRepository: AddCategoryRepository) {}

  async add (category: AddCategory.Params): Promise<AddCategory.Result> {
    await this.addCategoryRepository.addCategory(category)
    return null
  }
}

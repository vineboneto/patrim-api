import { AddCategory } from '@/domain/usecases/'
import { AddCategoryRepository } from '@/data/protocols/'

export class DbAddCategory implements AddCategory {
  constructor (private readonly addCategoryRepository: AddCategoryRepository) {}

  async add (category: AddCategory.Params): Promise<AddCategory.Result> {
    const isValid = await this.addCategoryRepository.addCategory(category)
    return isValid
  }
}

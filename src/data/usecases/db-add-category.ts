import { AddCategory } from '@/domain/usecases/'
import { AddCategoryRepository, CheckCategoryByNameRepository } from '@/data/protocols/'

export class DbAddCategory implements AddCategory {
  constructor (private readonly addCategoryRepository: AddCategoryRepository, private readonly checkCategoryByNameRepository: CheckCategoryByNameRepository) {}

  async add (category: AddCategory.Params): Promise<AddCategory.Result> {
    await this.checkCategoryByNameRepository.checkByName(category.name)
    const isValid = await this.addCategoryRepository.addCategory(category)
    return isValid
  }
}

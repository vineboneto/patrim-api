import { SaveCategory } from '@/domain/usecases'
import { CheckCategoryByNameRepository, SaveCategoryRepository } from '@/data/protocols'

export class DbSaveCategory implements SaveCategory {
  constructor (
    private readonly saveCategoryRepository: SaveCategoryRepository,
    private readonly checkCategoryByNameRepository: CheckCategoryByNameRepository
  ) {}

  async save (category: SaveCategory.Params): Promise<SaveCategory.Result> {
    const exists = await this.checkCategoryByNameRepository.checkByName(category.name)
    let isValid = false
    if (!exists) {
      isValid = await this.saveCategoryRepository.save(category)
    }
    return isValid
  }
}

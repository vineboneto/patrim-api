import { SaveCategory } from '@/domain/usecases'
import { CheckCategoryByNameRepository, UpdateCategoryRepository } from '@/data/protocols'

export class DbSaveCategory implements SaveCategory {
  constructor (
    private readonly updateCategoryRepository: UpdateCategoryRepository,
    private readonly checkCategoryByNameRepository: CheckCategoryByNameRepository
  ) {}

  async save (category: SaveCategory.Params): Promise<SaveCategory.Result> {
    const exists = await this.checkCategoryByNameRepository.checkByName(category.name)
    let isValid = false
    if (!exists) {
      if (category.id) {
        isValid = await this.updateCategoryRepository.update({
          id: category.id,
          name: category.name
        })
      }
    }
    return isValid
  }
}

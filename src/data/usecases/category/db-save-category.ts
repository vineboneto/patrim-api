import { SaveCategory } from '@/domain/usecases'
import { AddCategoryRepository, CheckCategoryByNameRepository, UpdateCategoryRepository } from '@/data/protocols'

export class DbSaveCategory implements SaveCategory {
  constructor (
    private readonly updateCategoryRepository: UpdateCategoryRepository,
    private readonly addCategoryRepository: AddCategoryRepository,
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
      } else {
        await this.addCategoryRepository.add(category)
      }
    }
    return isValid
  }
}

import { SaveCategory } from '@/domain/usecases'
import { AddCategoryRepository, CheckCategoryByNameRepository, UpdateCategoryRepository } from '@/data/protocols'

export class DbSaveCategory implements SaveCategory {
  constructor (
    private readonly updateCategoryRepository: UpdateCategoryRepository,
    private readonly addCategoryRepository: AddCategoryRepository,
    private readonly checkCategoryByNameRepository: CheckCategoryByNameRepository
  ) {}

  async save (category: SaveCategory.Params): Promise<SaveCategory.Model> {
    const { id, name } = category
    const exists = await this.checkCategoryByNameRepository.checkByName(name)
    let categoryModel = null
    if (!exists) {
      id
        ? categoryModel = await this.updateCategoryRepository.update({ id, name })
        : categoryModel = await this.addCategoryRepository.add({ name })
    }
    return categoryModel
  }
}

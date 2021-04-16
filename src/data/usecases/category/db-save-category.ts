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
    if (!exists) {
      if (id) {
        return this.updateCategoryRepository.update({ id, name })
      }
      return this.addCategoryRepository.add({ name })
    }
    return null
  }
}

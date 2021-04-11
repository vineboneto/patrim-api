import { SaveCategory } from '@/domain/usecases'
import { AddCategoryRepository, CheckCategoryByNameRepository, UpdateCategoryRepository } from '@/data/protocols'

export class DbSaveCategory implements SaveCategory {
  constructor (
    private readonly updateCategoryRepository: UpdateCategoryRepository,
    private readonly addCategoryRepository: AddCategoryRepository,
    private readonly checkCategoryByNameRepository: CheckCategoryByNameRepository
  ) {}

  async save (category: SaveCategory.Params): Promise<SaveCategory.Result> {
    const { id, name } = category
    const exists = await this.checkCategoryByNameRepository.checkByName(name)
    let isValid = false
    if (!exists) {
      id
        ? isValid = await this.updateCategoryRepository.update({ id, name })
        : isValid = await this.addCategoryRepository.add({ name })
    }
    return isValid
  }
}

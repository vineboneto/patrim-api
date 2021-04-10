import { SaveCategoryRepository } from '@/data/protocols'
import { SaveCategory } from '@/domain/usecases'

export class DbSaveCategory implements SaveCategory {
  constructor (
    private readonly SaveCategoryRepository: SaveCategoryRepository
  ) {}

  async save (category: SaveCategory.Params): Promise<SaveCategory.Result> {
    await this.SaveCategoryRepository.save(category)
    return null
  }
}

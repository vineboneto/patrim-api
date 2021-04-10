import { UpdateCategoryRepository } from '@/data/protocols'
import { UpdateCategory } from '@/domain/usecases'

export class DbUpdateCategory implements UpdateCategory {
  constructor (
    private readonly updateCategory: UpdateCategoryRepository
  ) {}

  async update (category: UpdateCategory.Params): Promise<UpdateCategory.Result> {
    await this.updateCategory.update(category)
    return null
  }
}

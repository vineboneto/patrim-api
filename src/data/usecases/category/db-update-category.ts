import { UpdateCategory } from '@/domain/usecases'
import { UpdateCategoryRepository } from '@/data/protocols'

export class DbUpdateCategory implements UpdateCategory {
  constructor (
    private readonly updateCategoryRepository: UpdateCategoryRepository
  ) {}

  async update (category: UpdateCategory.Params): Promise<UpdateCategory.Model> {
    const { id, name } = category
    return this.updateCategoryRepository.update({ id, name })
  }
}

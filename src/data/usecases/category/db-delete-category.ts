import { DeleteSectorRepository, CheckCategoryByIdRepository } from '@/data/protocols'
import { DeleteCategory } from '@/domain/usecases'

export class DbDeleteCategory implements DeleteCategory {
  constructor (
    private readonly deleteCategoryRepository: DeleteSectorRepository,
    private readonly checkCategoryByIdRepository: CheckCategoryByIdRepository
  ) {}

  async delete (params: DeleteCategory.Params): Promise<DeleteCategory.Model> {
    const exists = await this.checkCategoryByIdRepository.checkById(params.id)
    if (exists) {
      return this.deleteCategoryRepository.delete(params.id)
    }
    return null
  }
}

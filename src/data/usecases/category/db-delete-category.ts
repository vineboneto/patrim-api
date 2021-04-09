import { DeleteSectorRepository, CheckCategoryByIdRepository } from '@/data/protocols'
import { DeleteCategory } from '@/domain/usecases'

export class DbDeleteCategory implements DeleteCategory {
  constructor (
    private readonly deleteCategoryRepository: DeleteSectorRepository,
    private readonly checkCategoryByIdRepository: CheckCategoryByIdRepository
  ) {}

  async delete (params: DeleteCategory.Params): Promise<DeleteCategory.Model> {
    await this.checkCategoryByIdRepository.checkById(params.id)
    await this.deleteCategoryRepository.delete(params.id)
    return null
  }
}

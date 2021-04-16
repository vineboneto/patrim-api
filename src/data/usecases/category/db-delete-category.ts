import { DeleteSectorRepository, CheckCategoryByIdRepository } from '@/data/protocols'
import { DeleteCategory } from '@/domain/usecases'

export class DbDeleteCategory implements DeleteCategory {
  constructor (
    private readonly deleteCategoryRepository: DeleteSectorRepository,
    private readonly checkCategoryByIdRepository: CheckCategoryByIdRepository
  ) {}

  async delete (params: DeleteCategory.Params): Promise<DeleteCategory.Model> {
    const { id } = params
    const exists = await this.checkCategoryByIdRepository.checkById({ id })
    if (exists) {
      return this.deleteCategoryRepository.delete({ id })
    }
    return null
  }
}

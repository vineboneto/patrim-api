import { DeleteSectorRepository } from '@/data/protocols'
import { DeleteCategory } from '@/domain/usecases'

export class DbDeleteCategory implements DeleteCategory {
  constructor (
    private readonly deleteCategoryRepository: DeleteSectorRepository
  ) {}

  async delete (params: DeleteCategory.Params): Promise<DeleteCategory.Model> {
    await this.deleteCategoryRepository.delete(params.id)
    return null
  }
}

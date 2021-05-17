import { CheckPatrimonyByCategoryIdRepository, DeleteSectorRepository } from '@/data/protocols'
import { DeleteCategory } from '@/domain/usecases'

export class DbDeleteCategory implements DeleteCategory {
  constructor (
    private readonly deleteCategoryRepository: DeleteSectorRepository,
    private readonly checkPatrimonyByCategoryIdRepository: CheckPatrimonyByCategoryIdRepository
  ) {}

  async delete (params: DeleteCategory.Params): Promise<DeleteCategory.Model> {
    const { id } = params
    const exists = await this.checkPatrimonyByCategoryIdRepository.checkByCategoryId({
      categoryId: id,
      accountId: params.accountId
    })
    if (!exists) {
      return this.deleteCategoryRepository.delete({ id, accountId: params.accountId })
    }
    return null
  }
}

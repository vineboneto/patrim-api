import { CheckDataByFieldRepository, DeleteCategoryRepository } from '@/data/protocols'
import { DeleteCategory } from '@/domain/usecases'

export class DbDeleteCategory implements DeleteCategory {
  constructor (
    private readonly deleteCategoryRepository: DeleteCategoryRepository,
    private readonly checkPatrimonyByFieldRepository: CheckDataByFieldRepository
  ) {}

  async delete (params: DeleteCategory.Params): Promise<DeleteCategory.Model> {
    const { id, accountId } = params
    const exists = await this.checkPatrimonyByFieldRepository.checkByField({
      accountId,
      value: id
    })
    if (!exists) {
      return this.deleteCategoryRepository.delete(params)
    }
    return null
  }
}

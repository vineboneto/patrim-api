import { UpdateCategory } from '@/domain/usecases'
import {
  CheckDataByFieldRepository,
  LoadCategoryNameByIdRepository,
  UpdateCategoryRepository
} from '@/data/protocols'

export class DbUpdateCategory implements UpdateCategory {
  constructor (
    private readonly updateCategoryRepository: UpdateCategoryRepository,
    private readonly loadCategoryNameByIdRepository: LoadCategoryNameByIdRepository,
    private readonly checkCategoryByNameRepository: CheckDataByFieldRepository
  ) {}

  async update (params: UpdateCategory.Params): Promise<UpdateCategory.Model> {
    const { name } = await this.loadCategoryNameByIdRepository.loadNameById(params.id)
    if (name !== params.name) {
      const exists = await this.checkCategoryByNameRepository.checkByField({
        accountId: params.accountId,
        value: params.name
      })
      if (exists) {
        return null
      }
    }
    return this.updateCategoryRepository.update(params)
  }
}

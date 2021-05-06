import { UpdateCategory } from '@/domain/usecases'
import {
  CheckCategoryByNameRepository,
  LoadCategoryNameByIdRepository,
  UpdateCategoryRepository
} from '@/data/protocols'

export class DbUpdateCategory implements UpdateCategory {
  constructor (
    private readonly updateCategoryRepository: UpdateCategoryRepository,
    private readonly loadCategoryNameByIdRepository: LoadCategoryNameByIdRepository,
    private readonly checkCategoryByNameRepository: CheckCategoryByNameRepository
  ) {}

  async update (params: UpdateCategory.Params): Promise<UpdateCategory.Model> {
    const { name } = await this.loadCategoryNameByIdRepository.loadNameById(params.id)
    if (name !== params.name) {
      const exists = await this.checkCategoryByNameRepository.checkByName({
        accountId: params.accountId,
        name: params.name
      })
      if (exists) {
        return null
      }
    }
    return this.updateCategoryRepository.update(params)
  }
}

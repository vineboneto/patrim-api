import { AddCategoryRepository, CheckCategoryByNameRepository } from '@/data/protocols'
import { AddCategory } from '@/domain/usecases'

export class DbAddCategory implements AddCategory {
  constructor (
    private readonly addCategoryRepository: AddCategoryRepository,
    private readonly checkCategoryByNameRepository: CheckCategoryByNameRepository
  ) {}

  async add (params: AddCategory.Params): Promise<AddCategory.Model> {
    const exists = await this.checkCategoryByNameRepository.checkByName({
      name: params.name,
      accountId: params.accountId
    })
    if (!exists) {
      return this.addCategoryRepository.add(params)
    }
    return null
  }
}

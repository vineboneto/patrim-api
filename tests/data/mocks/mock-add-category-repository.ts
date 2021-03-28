import { AddCategoryRepository } from '@/data/protocols/'

export class AddCategoryRepositorySpy implements AddCategoryRepository {
  params: AddCategoryRepository.Params
  result = true
  async addCategory (category: AddCategoryRepository.Params): Promise<AddCategoryRepository.Result> {
    this.params = category
    return this.result
  }
}

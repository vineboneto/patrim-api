import { AddCategory } from '@/domain/usecases'

export class AddCategorySpy implements AddCategory {
  params: AddCategory.Params
  result = true
  async add (category: AddCategory.Params): Promise<AddCategory.Result> {
    this.params = category
    return this.result
  }
}

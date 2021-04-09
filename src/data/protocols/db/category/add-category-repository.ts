import { AddCategory } from '@/domain/usecases'

export interface AddCategoryRepository {
  addCategory: (category: AddCategoryRepository.Params) => Promise<AddCategoryRepository.Model>
}

export namespace AddCategoryRepository {
  export type Params = AddCategory.Params
  export type Model = AddCategory.Result
}

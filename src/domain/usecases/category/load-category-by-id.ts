import { CategoryModel } from '@/domain/models'

export interface LoadCategoryById {
  loadById (params: LoadCategoryById.Params): Promise<LoadCategoryById.Model>
}

export namespace LoadCategoryById {
  export type Params = {
    id: number
    accountId: number
  }
  export type Model = CategoryModel
}

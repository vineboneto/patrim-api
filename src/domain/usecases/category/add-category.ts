import { CategoryModel } from '@/domain/models'

export interface AddCategory {
  add (params: AddCategory.Params): Promise<AddCategory.Model>
}

export namespace AddCategory {
  export type Params = {
    name: string
    accountId: number
  }

  export type Model = CategoryModel
}

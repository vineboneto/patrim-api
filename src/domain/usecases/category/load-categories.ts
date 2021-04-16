import { CategoryModel } from '@/domain/models'

export interface LoadCategories {
  load (params: LoadCategories.Params): Promise<LoadCategories.Model>
}

export namespace LoadCategories {
  export type Params = {
    skip?: number
    take?: number
  }

  export type Model = CategoryModel[]
}

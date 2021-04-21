import { CategoryModel } from '@/domain/models'

export interface UpdateCategory {
  update (params: UpdateCategory.Params): Promise<UpdateCategory.Model>
}

export namespace UpdateCategory {
  export type Params = {
    id: number
    name: string
  }

  export type Model = CategoryModel
}

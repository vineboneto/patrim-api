import { CategoryModel } from '@/domain/models'

export interface DeleteCategory {
  delete (params: DeleteCategory.Params): Promise<DeleteCategory.Model>
}

export namespace DeleteCategory {
  export type Params = {
    id: number
    accountId: number
  }

  export type Model = CategoryModel
}

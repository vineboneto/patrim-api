import { CategoryModel } from '@/domain/models'

export interface SaveCategory {
  save (SaveCategory: SaveCategory.Params): Promise<SaveCategory.Model>
}

export namespace SaveCategory {
  export type Params = {
    id?: number
    name: string
  }

  export type Model = CategoryModel
}

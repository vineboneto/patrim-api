import { CategoryModel, OwnerModel, PlaceModel } from '@/domain/models'

export interface SavePatrimony {
  save (params: SavePatrimony.Params): Promise<SavePatrimony.Model>
}

export namespace SavePatrimony {
  export type Params = {
    id?: number
    number: string
    brand: string
    description?: string
    categoryId: number
    ownerId: number
    placeId: number
  }

  export type Model = {
    id: number
    number: string
    brand: string
    description: string
    category: CategoryModel
    owner: OwnerModel
    place: PlaceModel
  }
}

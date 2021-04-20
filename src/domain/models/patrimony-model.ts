import { CategoryModel, OwnerModel, PlaceModel } from '@/domain/models'

export type PatrimonyModel = {
  id: number
  number: string
  brand: string
  description: string
  category: CategoryModel
  owner: OwnerModel
  place: PlaceModel
}

import { CategoryModel, OwnerModel } from '@/domain/models'

export type PatrimonyModel = {
  id: number
  number: string
  brand: string
  description: string
  category: CategoryModel
  owner: OwnerModel
}

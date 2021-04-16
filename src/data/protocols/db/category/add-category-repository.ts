import { SaveCategory } from '@/domain/usecases'

export interface AddCategoryRepository {
  add (category: AddCategoryRepository.Params): Promise<AddCategoryRepository.Model>
}

export namespace AddCategoryRepository {
  export type Params = {
    name: string
  }
  export type Model = SaveCategory.Model
}

import { LoadCategoryById } from '@/domain/usecases'

export interface LoadCategoryByIdRepository {
  loadById (params: LoadCategoryById.Params): Promise<LoadCategoryById.Model>
}

export namespace LoadCategoryByIdRepository {
  export type Params = LoadCategoryById.Params
  export type Model = LoadCategoryById.Model
}

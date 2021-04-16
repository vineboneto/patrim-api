import { LoadCategories } from '@/domain/usecases'

export interface LoadCategoriesRepository {
  loadAll (params: LoadCategoriesRepository.Params): Promise<LoadCategoriesRepository.Model>
}

export namespace LoadCategoriesRepository {
  export type Params = LoadCategories.Params
  export type Model = LoadCategories.Model
}

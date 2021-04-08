import { LoadCategories } from '@/domain/usecases'

export interface LoadCategoriesRepository {
  loadAll (): Promise<LoadCategoriesRepository.Model>
}

export namespace LoadCategoriesRepository {
  export type Model = LoadCategories.Model
}

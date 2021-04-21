import { UpdateCategory } from '@/domain/usecases'

export interface UpdateCategoryRepository {
  update (category: UpdateCategoryRepository.Params): Promise<UpdateCategoryRepository.Model>
}

export namespace UpdateCategoryRepository {
  export type Params = UpdateCategory.Params
  export type Model = UpdateCategory.Model
}

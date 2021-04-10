import { UpdateCategory } from '@/domain/usecases'

export interface UpdateCategoryRepository {
  update: (category: UpdateCategoryRepository.Params) => Promise<UpdateCategoryRepository.Result>
}

export namespace UpdateCategoryRepository {
  export type Params = UpdateCategory.Params
  export type Result = UpdateCategory.Result
}

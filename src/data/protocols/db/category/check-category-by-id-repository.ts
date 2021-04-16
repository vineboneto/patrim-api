import { CheckCategoryById } from '@/domain/usecases'

export interface CheckCategoryByIdRepository {
  checkById (params: CheckCategoryById.Params): Promise<CheckCategoryByIdRepository.Result>
}

export namespace CheckCategoryByIdRepository {
  export type Params = CheckCategoryById.Params
  export type Result = CheckCategoryById.Result
}

import { DeleteCategory } from '@/domain/usecases'

export interface DeleteCategoryRepository {
  delete (params: DeleteCategory.Params): Promise<DeleteCategoryRepository.Model>
}

export namespace DeleteCategoryRepository {
  export type Params = DeleteCategory.Params
  export type Model = DeleteCategory.Model
}

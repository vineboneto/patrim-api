import { DeleteCategory } from '@/domain/usecases'

export interface DeleteCategoryRepository {
  delete (id: number): Promise<DeleteCategoryRepository.Model>
}

export namespace DeleteCategoryRepository {
  export type Model = DeleteCategory.Model
}

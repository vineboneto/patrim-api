import { SaveCategory } from '@/domain/usecases'

export interface UpdateCategoryRepository {
  update (category: UpdateCategoryRepository.Params): Promise<UpdateCategoryRepository.Model>
}

export namespace UpdateCategoryRepository {
  export type Params = {
    id: number
    name: string
  }
  export type Model = SaveCategory.Model
}

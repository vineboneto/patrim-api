import { SaveCategory } from '@/domain/usecases'

export interface SaveCategoryRepository {
  save: (category: SaveCategoryRepository.Params) => Promise<SaveCategoryRepository.Result>
}

export namespace SaveCategoryRepository {
  export type Params = SaveCategory.Params
  export type Result = SaveCategory.Result
}

import { LoadPatrimoniesByCategoryId } from '@/domain/usecases'

export interface LoadPatrimoniesByCategoryIdRepository {
  loadByCategoryId (params: LoadPatrimoniesByCategoryIdRepository.Params):
  Promise<LoadPatrimoniesByCategoryIdRepository.Model>
}

export namespace LoadPatrimoniesByCategoryIdRepository {
  export type Params = LoadPatrimoniesByCategoryId.Params
  export type Model = LoadPatrimoniesByCategoryId.Model
}

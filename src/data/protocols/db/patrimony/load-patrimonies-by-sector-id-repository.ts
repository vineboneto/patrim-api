import { LoadPatrimoniesBySectorId } from '@/domain/usecases'

export interface LoadPatrimoniesBySectorIdRepository {
  loadBySectorId (params: LoadPatrimoniesBySectorIdRepository.Params): Promise<LoadPatrimoniesBySectorIdRepository.Model>
}

export namespace LoadPatrimoniesBySectorIdRepository {
  export type Params = LoadPatrimoniesBySectorId.Params
  export type Model = LoadPatrimoniesBySectorId.Model
}

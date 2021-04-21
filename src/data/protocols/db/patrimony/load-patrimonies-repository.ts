import { LoadPatrimonies } from '@/domain/usecases'

export interface LoadPatrimoniesRepository {
  loadAll (params: LoadPatrimoniesRepository.Params): Promise<LoadPatrimoniesRepository.Model>
}

export namespace LoadPatrimoniesRepository {
  export type Params = LoadPatrimonies.Params
  export type Model = LoadPatrimonies.Model
}

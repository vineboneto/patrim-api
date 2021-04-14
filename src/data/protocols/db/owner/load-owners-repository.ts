import { LoadOwners } from '@/domain/usecases'

export interface LoadOwnersRepository {
  loadAll (params: LoadOwnersRepository.Params): Promise<LoadOwnersRepository.Model>
}

export namespace LoadOwnersRepository {
  export type Params = LoadOwners.Params
  export type Model = LoadOwners.Model
}

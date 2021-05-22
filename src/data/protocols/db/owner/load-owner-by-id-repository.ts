import { LoadOwnerById } from '@/domain/usecases'

export interface LoadOwnerByIdRepository {
  loadById (params: LoadOwnerById.Params): Promise<LoadOwnerById.Model>
}

export namespace LoadOwnerByIdRepository {
  export type Params = LoadOwnerById.Params
  export type Model = LoadOwnerById.Model
}

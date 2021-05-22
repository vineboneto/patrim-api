import { LoadSectorById } from '@/domain/usecases'

export interface LoadSectorByIdRepository {
  loadById (params: LoadSectorById.Params): Promise<LoadSectorById.Model>
}

export namespace LoadSectorByIdRepository {
  export type Params = LoadSectorById.Params
  export type Model = LoadSectorById.Model
}

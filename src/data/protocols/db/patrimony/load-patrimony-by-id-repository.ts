import { LoadPatrimonyById } from '@/domain/usecases'

export interface LoadPatrimonyByIdRepository {
  loadById (params: LoadPatrimonyById.Params): Promise<LoadPatrimonyById.Model>
}

export namespace LoadPatrimonyByIdRepository {
  export type Params = LoadPatrimonyById.Params
  export type Model = LoadPatrimonyById.Model
}

import { LoadPatrimonyByNumber } from '@/domain/usecases'

export interface LoadPatrimonyByNumberRepository {
  loadByNumber(params: LoadPatrimonyByNumberRepository.Params): Promise<LoadPatrimonyByNumberRepository.Model>
}

export namespace LoadPatrimonyByNumberRepository {
  export type Params = LoadPatrimonyByNumber.Params
  export type Model = LoadPatrimonyByNumber.Model
}

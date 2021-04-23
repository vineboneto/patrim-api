import { LoadPatrimonyByNumber } from '@/domain/usecases'

export interface LoadPatrimonyByNumberRepository {
  loadByNumber(number: string): Promise<LoadPatrimonyByNumberRepository.Model>
}

export namespace LoadPatrimonyByNumberRepository {
  export type Model = LoadPatrimonyByNumber.Model
}

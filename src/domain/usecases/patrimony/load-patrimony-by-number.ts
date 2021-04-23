import { PatrimonyModel } from '@/domain/models'

export interface LoadPatrimonyByNumber {
  loadByNumber (number: string): Promise<LoadPatrimonyByNumber.Model>
}

export namespace LoadPatrimonyByNumber {
  export type Model = PatrimonyModel
}

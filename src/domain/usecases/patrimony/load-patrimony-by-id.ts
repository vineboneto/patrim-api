import { PatrimonyModel } from '@/domain/models'

export interface LoadPatrimonyById {
  loadById (params: LoadPatrimonyById.Params): Promise<LoadPatrimonyById.Model>
}

export namespace LoadPatrimonyById {
  export type Params = {
    id: number
    accountId: number
  }
  export type Model = PatrimonyModel
}

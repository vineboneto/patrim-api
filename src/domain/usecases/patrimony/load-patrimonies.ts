import { PatrimonyModel } from '@/domain/models'

export interface LoadPatrimonies {
  load (params: LoadPatrimonies.Params): Promise<LoadPatrimonies.Model>
}

export namespace LoadPatrimonies {
  export type Params = {
    skip?: number
    take?: number
    accountId: number
  }

  export type Model = PatrimonyModel[]
}

import { PatrimonyModel } from '@/domain/models'

export interface LoadPatrimonies {
  load (params: LoadPatrimonies.Params): Promise<LoadPatrimonies.Model>
}

export namespace LoadPatrimonies {
  export type Params = {
    skip?: number
    take?: number
  }

  export type Model = PatrimonyModel[]
}

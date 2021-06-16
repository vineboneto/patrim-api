import { PatrimonyModel } from '@/domain/models'

export interface LoadPatrimoniesByKey {
  loadPatrimonyByKey (params: LoadPatrimoniesByKey.Params): Promise<LoadPatrimoniesByKey.Model>
}

export namespace LoadPatrimoniesByKey {
  export type Params = {
    key: number
    accountId: number
    skip?: number
    take?: number
  }

  export type Model = {
    model: PatrimonyModel[]
    count: number
  }
}

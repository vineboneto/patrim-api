import { PatrimonyModel } from '@/domain/models'

export interface LoadPatrimoniesByOwnerId {
  loadByOwnerId (params: LoadPatrimoniesByOwnerId.Params): Promise<LoadPatrimoniesByOwnerId.Model>
}

export namespace LoadPatrimoniesByOwnerId {
  export type Params = {
    ownerId: number
    accountId: number
    skip?: number
    take?: number
  }
  export type Model = {
    model: PatrimonyModel[]
    count: number
  }
}

import { OwnerModel } from '@/domain/models'

export interface LoadOwners {
  load (params: LoadOwners.Params): Promise<LoadOwners.Model>
}

export namespace LoadOwners {
  export type Params = {
    accountId: number
    skip?: number
    take?: number
  }

  export type Model = {
    model: OwnerModel[]
    count: number
  }
}

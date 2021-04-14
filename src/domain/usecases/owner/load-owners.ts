import { OwnerModel } from '@/domain/models'

export interface LoadOwners {
  load (params: LoadOwners.Params): Promise<LoadOwners.Model>
}

export namespace LoadOwners {
  export type Params = {
    skip: number
    take: number
  }

  export type Model = OwnerModel[]
}

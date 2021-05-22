import { OwnerModel } from '@/domain/models'

export interface LoadOwnerById {
  loadById (params: LoadOwnerById.Params): Promise<LoadOwnerById.Model>
}

export namespace LoadOwnerById {
  export type Params = {
    id: number
    accountId: number
  }
  export type Model = OwnerModel
}

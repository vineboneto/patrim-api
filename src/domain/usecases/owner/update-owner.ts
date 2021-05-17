import { OwnerModel } from '@/domain/models'

export interface UpdateOwner {
  update (params: UpdateOwner.Params): Promise<UpdateOwner.Model>
}

export namespace UpdateOwner {
  export type Params = {
    id: number
    name: string
    sectorId: number
    accountId: number
  }

  export type Model = OwnerModel
}

import { OwnerModel } from '@/domain/models'

export interface AddOwner {
  add (params: AddOwner.Params): Promise<AddOwner.Model>
}

export namespace AddOwner {
  export type Params = {
    name: string
    sectorId: number
    accountId: number
  }

  export type Model = OwnerModel
}

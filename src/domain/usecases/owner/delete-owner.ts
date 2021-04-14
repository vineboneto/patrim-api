import { OwnerModel } from '@/domain/models'

export interface DeleteOwner {
  delete (params: DeleteOwner.Params): Promise<DeleteOwner.Model>
}

export namespace DeleteOwner {
  export type Params = {
    id: number
  }
  export type Model = OwnerModel
}

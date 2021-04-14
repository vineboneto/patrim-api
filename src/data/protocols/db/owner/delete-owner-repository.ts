import { DeleteOwner } from '@/domain/usecases'

export interface DeleteOwnerRepository {
  delete (params: DeleteOwner.Params): Promise<DeleteOwner.Model>
}

export namespace DeleteOwnerRepository {
  export type Params = DeleteOwner.Params
  export type Model = DeleteOwner.Model
}

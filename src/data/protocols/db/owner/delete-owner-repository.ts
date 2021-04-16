import { DeleteOwner } from '@/domain/usecases'

export interface DeleteOwnerRepository {
  delete (params: DeleteOwnerRepository.Params): Promise<DeleteOwnerRepository.Model>
}

export namespace DeleteOwnerRepository {
  export type Params = DeleteOwner.Params
  export type Model = DeleteOwner.Model
}

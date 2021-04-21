import { UpdateOwner } from '@/domain/usecases'

export interface UpdateOwnerRepository {
  update(owner: UpdateOwnerRepository.Params): Promise<UpdateOwnerRepository.Model>
}

export namespace UpdateOwnerRepository {
  export type Params = UpdateOwner.Params
  export type Model = UpdateOwner.Model
}

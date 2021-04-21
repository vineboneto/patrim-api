import { AddOwner } from '@/domain/usecases'

export interface AddOwnerRepository {
  add: (owner: AddOwnerRepository.Params) => Promise<AddOwnerRepository.Model>
}

export namespace AddOwnerRepository {
  export type Params = AddOwner.Params
  export type Model = AddOwner.Model
}

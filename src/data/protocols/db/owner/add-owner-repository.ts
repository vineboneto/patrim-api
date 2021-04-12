import { SaveOwner } from '@/domain/usecases'

export interface AddOwnerRepository {
  add: (owner: AddOwnerRepository.Params) => Promise<AddOwnerRepository.Result>
}

export namespace AddOwnerRepository {
  export type Params = {
    name: string
    sectorId: string
  }
  export type Result = SaveOwner.Model
}

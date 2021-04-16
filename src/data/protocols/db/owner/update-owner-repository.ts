import { SaveOwner } from '@/domain/usecases'

export interface UpdateOwnerRepository {
  update(owner: UpdateOwnerRepository.Params): Promise<UpdateOwnerRepository.Model>
}

export namespace UpdateOwnerRepository {
  export type Params = {
    id: number
    name: string
    sectorId: number
  }
  export type Model = SaveOwner.Model
}

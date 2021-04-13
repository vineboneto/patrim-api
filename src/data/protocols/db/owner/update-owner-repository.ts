import { SaveOwner } from '@/domain/usecases'

export interface UpdateOwnerRepository {
  update(place: UpdateOwnerRepository.Params): Promise<UpdateOwnerRepository.Model>
}

export namespace UpdateOwnerRepository {
  export type Params = {
    id: string
    name: string
    sectorId: string
  }
  export type Model = SaveOwner.Model
}

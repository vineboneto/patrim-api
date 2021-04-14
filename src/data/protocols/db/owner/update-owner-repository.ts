import { SaveOwner } from '@/domain/usecases'

export interface UpdateOwnerRepository {
  update(place: UpdateOwnerRepository.Params): Promise<UpdateOwnerRepository.Model>
}

export namespace UpdateOwnerRepository {
  export type Params = {
    id: string | number
    name: string
    sectorId: string | number
  }
  export type Model = SaveOwner.Model
}

import { DeleteSector } from '@/domain/usecases'

export interface DeleteSectorRepository {
  delete (params: DeleteSectorRepository.Params): Promise<DeleteSectorRepository.Model>
}

export namespace DeleteSectorRepository {
  export type Params =DeleteSector.Params
  export type Model = DeleteSector.Model
}

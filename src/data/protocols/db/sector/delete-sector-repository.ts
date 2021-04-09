import { DeleteSector } from '@/domain/usecases'

export interface DeleteSectorRepository {
  delete (id: number): Promise<DeleteSectorRepository.Model>
}

export namespace DeleteSectorRepository {
  export type Model = DeleteSector.Model
}

import { DeleteSector } from '@/domain/usecases'

export interface DeleteSectorRepository {
  delete (id: string): Promise<DeleteSectorRepository.Model>
}

export namespace DeleteSectorRepository {
  export type Model = DeleteSector.Model
}

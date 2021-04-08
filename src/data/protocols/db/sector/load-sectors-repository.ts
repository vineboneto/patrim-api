import { LoadSectors } from '@/domain/usecases'

export interface LoadSectorsRepository {
  loadAll (): Promise<LoadSectorsRepository.Model>
}

export namespace LoadSectorsRepository {
  export type Model = LoadSectors.Model
}

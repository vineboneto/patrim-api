import { LoadSectors } from '@/domain/usecases'

export interface LoadSectorsRepository {
  loadAll (): Promise<LoadSectorsRepository.Result>
}

export namespace LoadSectorsRepository {
  export type Result = LoadSectors.Result
}

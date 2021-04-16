import { LoadSectors } from '@/domain/usecases'

export interface LoadSectorsRepository {
  loadAll (params: LoadSectorsRepository.Params): Promise<LoadSectorsRepository.Model>
}

export namespace LoadSectorsRepository {
  export type Params = LoadSectors.Params
  export type Model = LoadSectors.Model
}

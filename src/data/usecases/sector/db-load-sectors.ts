import { LoadSectors } from '@/domain/usecases/sector/load-sectors'
import { LoadSectorsRepository } from '../../protocols'

export class DbLoadSectors implements LoadSectors {
  constructor (
    private readonly loadSectorsRepository: LoadSectorsRepository
  ) {}

  async load (params: LoadSectors.Params): Promise<LoadSectors.Model> {
    return this.loadSectorsRepository.loadAll(params)
  }
}

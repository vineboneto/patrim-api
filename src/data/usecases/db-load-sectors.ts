import { LoadSectors } from '@/domain/usecases/load-sectors'
import { LoadSectorsRepository } from '../protocols'

export class DbLoadSectors implements LoadSectors {
  constructor (
    private readonly loadSectorsRepository: LoadSectorsRepository
  ) {}

  async load (): Promise<LoadSectors.Result> {
    return this.loadSectorsRepository.loadAll()
  }
}

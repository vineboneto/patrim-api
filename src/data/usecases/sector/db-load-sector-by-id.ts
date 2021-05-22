import { LoadSectorById } from '@/domain/usecases'
import { LoadSectorByIdRepository } from '@/data/protocols'

export class DbLoadSectorById implements LoadSectorById {
  constructor (
    private readonly loadSectorByIdRepository: LoadSectorByIdRepository
  ) {}

  async loadById (params: LoadSectorById.Params): Promise<LoadSectorById.Model> {
    return this.loadSectorByIdRepository.loadById(params)
  }
}

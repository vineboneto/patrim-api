import { LoadOwnerById } from '@/domain/usecases'
import { LoadOwnerByIdRepository } from '@/data/protocols'

export class DbLoadOwnerById implements LoadOwnerById {
  constructor (
    private readonly loadOwnerByIdRepository: LoadOwnerByIdRepository
  ) {}

  async loadById (params: LoadOwnerById.Params): Promise<LoadOwnerById.Model> {
    return this.loadOwnerByIdRepository.loadById(params)
  }
}

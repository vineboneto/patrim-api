import { LoadPatrimonyById } from '@/domain/usecases'
import { LoadPatrimonyByIdRepository } from '@/data/protocols'

export class DbLoadPatrimonyById implements LoadPatrimonyById {
  constructor (
    private readonly loadPatrimonyByIdRepository: LoadPatrimonyByIdRepository
  ) {}

  async loadById (params: LoadPatrimonyById.Params): Promise<LoadPatrimonyById.Model> {
    await this.loadPatrimonyByIdRepository.loadById(params)
    return null
  }
}

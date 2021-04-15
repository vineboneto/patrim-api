import { LoadPatrimonyByOwnerId } from '@/domain/usecases'
import { LoadPatrimonyByOwnerIdRepository } from '@/data/protocols'

export class DbLoadPatrimonyByOwnerId implements LoadPatrimonyByOwnerId {
  constructor (
    private readonly loadPatrimonyByOwnerIdRepository: LoadPatrimonyByOwnerIdRepository
  ) {}

  async loadByOwnerId (params: LoadPatrimonyByOwnerId.Params): Promise<LoadPatrimonyByOwnerId.Model> {
    return this.loadPatrimonyByOwnerIdRepository.loadByOwnerId(params)
  }
}

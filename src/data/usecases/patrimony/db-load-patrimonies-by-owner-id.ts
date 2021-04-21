import { LoadPatrimoniesByOwnerId } from '@/domain/usecases'
import { LoadPatrimoniesByOwnerIdRepository } from '@/data/protocols'

export class DbLoadPatrimoniesByOwnerId implements LoadPatrimoniesByOwnerId {
  constructor (
    private readonly loadPatrimoniesByOwnerIdRepository: LoadPatrimoniesByOwnerIdRepository
  ) {}

  async loadByOwnerId (params: LoadPatrimoniesByOwnerId.Params): Promise<LoadPatrimoniesByOwnerId.Model> {
    return this.loadPatrimoniesByOwnerIdRepository.loadByOwnerId(params)
  }
}

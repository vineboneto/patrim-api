import { AddOwner } from '@/domain/usecases'
import { AddOwnerRepository, CheckSectorByIdRepository } from '@/data/protocols'

export class DbAddOwner implements AddOwner {
  constructor (
    private readonly addOwnerRepository: AddOwnerRepository,
    private readonly checkSectorByIdRepository: CheckSectorByIdRepository
  ) {}

  async add (params: AddOwner.Params): Promise<AddOwner.Model> {
    const exists = await this.checkSectorByIdRepository.checkById({ id: params.sectorId })
    if (exists) {
      return this.addOwnerRepository.add(params)
    }
    return null
  }
}

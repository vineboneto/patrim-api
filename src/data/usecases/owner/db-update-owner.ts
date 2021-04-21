import { UpdateOwner } from '@/domain/usecases'
import { CheckSectorByIdRepository, UpdateOwnerRepository } from '@/data/protocols'

export class DbUpdateOwner implements UpdateOwner {
  constructor (
    private readonly updateOwnerRepository: UpdateOwnerRepository,
    private readonly checkSectorByIdRepository: CheckSectorByIdRepository
  ) {}

  async update (params: UpdateOwner.Params): Promise<UpdateOwner.Model> {
    const exists = await this.checkSectorByIdRepository.checkById({ id: params.sectorId })
    if (exists) {
      return this.updateOwnerRepository.update(params)
    }
    return null
  }
}

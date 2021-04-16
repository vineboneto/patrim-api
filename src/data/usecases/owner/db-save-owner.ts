import { SaveOwner } from '@/domain/usecases'
import { AddOwnerRepository, CheckSectorByIdRepository, UpdateOwnerRepository } from '@/data/protocols'

export class DbSaveOwner implements SaveOwner {
  constructor (
    private readonly addOwnerRepository: AddOwnerRepository,
    private readonly updateOwnerRepository: UpdateOwnerRepository,
    private readonly checkSectorByIdRepository: CheckSectorByIdRepository
  ) {}

  async save (owner: SaveOwner.Params): Promise<SaveOwner.Model> {
    const { id, name, sectorId } = owner
    const exists = await this.checkSectorByIdRepository.checkById({ id: sectorId })
    if (exists) {
      if (id) {
        return this.updateOwnerRepository.update({ id, name, sectorId })
      }
      return this.addOwnerRepository.add({ name, sectorId })
    }
    return null
  }
}

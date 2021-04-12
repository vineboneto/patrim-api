import { SaveOwner } from '@/domain/usecases'
import { AddOwnerRepository, UpdateOwnerRepository } from '@/data/protocols'

export class DbSaveOwner implements SaveOwner {
  constructor (
    private readonly addOwnerRepository: AddOwnerRepository,
    private readonly updateOwnerRepository: UpdateOwnerRepository
  ) {}

  async save (owner: SaveOwner.Params): Promise<SaveOwner.Model> {
    const { id, name, sectorId } = owner
    if (id) {
      return this.updateOwnerRepository.update({ id, name, sectorId })
    }
    return this.addOwnerRepository.add({ name, sectorId })
  }
}

import { SaveOwner } from '@/domain/usecases'
import { AddOwnerRepository } from '@/data/protocols'

export class DbSaveOwner implements SaveOwner {
  constructor (
    private readonly addOwnerRepository: AddOwnerRepository
  ) {}

  async save (owner: SaveOwner.Params): Promise<SaveOwner.Model> {
    const { name, sectorId } = owner
    const ownerModel = await this.addOwnerRepository.add({ name, sectorId })
    return ownerModel
  }
}

import { AddOwner } from '@/domain/usecases'
import { AddOwnerRepository } from '@/data/protocols'

export class DbAddOwner implements AddOwner {
  constructor (
    private readonly addOwnerRepository: AddOwnerRepository
  ) {}

  async add (params: AddOwner.Params): Promise<AddOwner.Model> {
    return this.addOwnerRepository.add(params)
  }
}

import { UpdateOwner } from '@/domain/usecases'
import { UpdateOwnerRepository } from '@/data/protocols'

export class DbUpdateOwner implements UpdateOwner {
  constructor (
    private readonly updateOwnerRepository: UpdateOwnerRepository
  ) {}

  async update (params: UpdateOwner.Params): Promise<UpdateOwner.Model> {
    return this.updateOwnerRepository.update(params)
  }
}

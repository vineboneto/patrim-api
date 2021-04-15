import { DeleteOwner } from '@/domain/usecases'
import { DeleteOwnerRepository } from '@/data/protocols'

export class DbDeleteOwner implements DeleteOwner {
  constructor (
    private readonly deleteOwnerRepository: DeleteOwnerRepository
  ) {}

  async delete (params: DeleteOwner.Params): Promise<DeleteOwner.Model> {
    return this.deleteOwnerRepository.delete(params)
  }
}

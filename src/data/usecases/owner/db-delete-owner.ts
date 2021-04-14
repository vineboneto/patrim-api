import { DeleteOwnerRepository } from '@/data/protocols'
import { DeleteOwner } from '@/domain/usecases'

export class DbDeleteOwner implements DeleteOwner {
  constructor (
    private readonly deleteOwnerRepository: DeleteOwnerRepository
  ) {}

  async delete (params: DeleteOwner.Params): Promise<DeleteOwner.Model> {
    return this.deleteOwnerRepository.delete(params)
  }
}

import { DeleteOwner } from '@/domain/usecases'
import { CheckPatrimonyByOwnerIdRepository, DeleteOwnerRepository } from '@/data/protocols'

export class DbDeleteOwner implements DeleteOwner {
  constructor (
    private readonly deleteOwnerRepository: DeleteOwnerRepository,
    private readonly checkPatrimonyByOwnerIdRepository: CheckPatrimonyByOwnerIdRepository
  ) {}

  async delete (params: DeleteOwner.Params): Promise<DeleteOwner.Model> {
    const { id, accountId } = params
    const exists = await this.checkPatrimonyByOwnerIdRepository.checkByOwnerId({
      ownerId: id,
      accountId
    })
    if (!exists) {
      return this.deleteOwnerRepository.delete({ id, accountId })
    }
    return null
  }
}

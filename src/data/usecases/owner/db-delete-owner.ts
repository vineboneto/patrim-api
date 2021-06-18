import { DeleteOwner } from '@/domain/usecases'
import { CheckPatrimonyByFieldRepository, DeleteOwnerRepository } from '@/data/protocols'

export class DbDeleteOwner implements DeleteOwner {
  constructor (
    private readonly deleteOwnerRepository: DeleteOwnerRepository,
    private readonly checkPatrimonyByFieldRepository: CheckPatrimonyByFieldRepository
  ) {}

  async delete (params: DeleteOwner.Params): Promise<DeleteOwner.Model> {
    const { id, accountId } = params
    const exists = await this.checkPatrimonyByFieldRepository.checkByField({
      value: id,
      accountId
    })
    if (!exists) {
      return this.deleteOwnerRepository.delete(params)
    }
    return null
  }
}

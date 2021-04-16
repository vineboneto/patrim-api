import { CheckOwnerById } from '@/domain/usecases'
import { CheckOwnerByIdRepository } from '@/data/protocols'

export class DbCheckOwnerById implements CheckOwnerById {
  constructor (
    private readonly checkOwnerByIdRepository: CheckOwnerByIdRepository
  ) {}

  async checkById (params: CheckOwnerById.Params): Promise<CheckOwnerById.Result> {
    const { id } = params
    return this.checkOwnerByIdRepository.checkById({ id })
  }
}

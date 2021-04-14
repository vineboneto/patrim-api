import { CheckOwnerById } from '@/domain/usecases'
import { CheckOwnerByIdRepository } from '@/data/protocols'

export class DbCheckOwnerById implements CheckOwnerById {
  constructor (
    private readonly checkOwnerByIdRepository: CheckOwnerByIdRepository
  ) {}

  async checkById (id: string): Promise<CheckOwnerById.Result> {
    return this.checkOwnerByIdRepository.checkById(id)
  }
}

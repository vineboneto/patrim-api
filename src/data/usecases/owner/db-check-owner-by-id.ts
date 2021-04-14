import { CheckOwnerById } from '@/domain/usecases'
import { CheckOwnerByIdRepository } from '@/data/protocols'

export class DbCheckOwnerById implements CheckOwnerById {
  constructor (
    private readonly checkOwnerByIdRepositorySpy: CheckOwnerByIdRepository
  ) {}

  async checkById (id: string): Promise<CheckOwnerById.Result> {
    return this.checkOwnerByIdRepositorySpy.checkById(id)
  }
}

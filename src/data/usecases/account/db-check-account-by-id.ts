import { CheckAccountById } from '@/domain/usecases'
import { CheckAccountByIdRepository } from '@/data/protocols'

export class DbCheckAccountById implements CheckAccountById {
  constructor (
    private readonly checkAccountByIdRepository: CheckAccountByIdRepository
  ) {}

  async checkById (id: number): Promise<CheckAccountById.Result> {
    return this.checkAccountByIdRepository.checkById(id)
  }
}
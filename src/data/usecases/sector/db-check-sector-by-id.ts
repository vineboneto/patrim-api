import { CheckSectorById } from '@/domain/usecases'
import { CheckSectorByIdRepository } from '@/data/protocols'

export class DbCheckSectorById implements CheckSectorById {
  constructor (
    private readonly checkSectorByIdRepository: CheckSectorByIdRepository
  ) {}

  async checkById (id: string): Promise<CheckSectorById.Result> {
    return this.checkSectorByIdRepository.checkById(id)
  }
}

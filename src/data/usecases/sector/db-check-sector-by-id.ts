import { CheckSectorById } from '@/domain/usecases'
import { CheckSectorByIdRepository } from '@/data/protocols'

export class DbCheckSectorById implements CheckSectorById {
  constructor (
    private readonly checkSectorByIdRepositorySpy: CheckSectorByIdRepository
  ) {}

  async checkById (id: number): Promise<CheckSectorById.Result> {
    return this.checkSectorByIdRepositorySpy.checkById(id)
  }
}
import { CheckCategoryById } from '@/domain/usecases'
import { CheckSectorByIdRepository } from '@/data/protocols'

export class DbCheckCategoryById implements CheckCategoryById {
  constructor (
    private readonly checkSectorByIdRepositorySpy: CheckSectorByIdRepository
  ) {}

  async checkById (id: number): Promise<CheckCategoryById.Result> {
    return this.checkSectorByIdRepositorySpy.checkById(id)
  }
}

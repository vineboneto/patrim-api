import { CheckCategoryById } from '@/domain/usecases'
import { CheckSectorByIdRepository } from '@/data/protocols'

export class DbCheckByIdCategory implements CheckCategoryById {
  constructor (
    private readonly checkSectorByIdRepositorySpy: CheckSectorByIdRepository
  ) {}

  async checkById (id: number): Promise<CheckCategoryById.Result> {
    await this.checkSectorByIdRepositorySpy.checkById(id)
    return null
  }
}

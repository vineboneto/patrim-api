import { CheckCategoryById } from '@/domain/usecases'
import { CheckCategoryByIdRepository } from '@/data/protocols'

export class DbCheckCategoryById implements CheckCategoryById {
  constructor (
    private readonly checkCategoryByIdRepository: CheckCategoryByIdRepository
  ) {}

  async checkById (id: string): Promise<CheckCategoryById.Result> {
    return this.checkCategoryByIdRepository.checkById(id)
  }
}

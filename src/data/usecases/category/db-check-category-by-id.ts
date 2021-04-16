import { CheckCategoryById } from '@/domain/usecases'
import { CheckCategoryByIdRepository } from '@/data/protocols'

export class DbCheckCategoryById implements CheckCategoryById {
  constructor (
    private readonly checkCategoryByIdRepository: CheckCategoryByIdRepository
  ) {}

  async checkById (params: CheckCategoryById.Params): Promise<CheckCategoryById.Result> {
    const { id } = params
    return this.checkCategoryByIdRepository.checkById({ id })
  }
}

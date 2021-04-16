import { CheckSectorById } from '@/domain/usecases'
import { CheckSectorByIdRepository } from '@/data/protocols'

export class DbCheckSectorById implements CheckSectorById {
  constructor (
    private readonly checkSectorByIdRepository: CheckSectorByIdRepository
  ) {}

  async checkById (params: CheckSectorById.Params): Promise<CheckSectorById.Result> {
    const { id } = params
    return this.checkSectorByIdRepository.checkById({ id })
  }
}

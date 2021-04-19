import { CheckPatrimonyById } from '@/domain/usecases'
import { CheckPatrimonyByIdRepository } from '@/data/protocols'

export class DbCheckPatrimonyById implements CheckPatrimonyById {
  constructor (
    private readonly checkPatrimonyByIdRepository: CheckPatrimonyByIdRepository
  ) {}

  async checkById (params: CheckPatrimonyById.Params): Promise<CheckPatrimonyById.Result> {
    return this.checkPatrimonyByIdRepository.checkById(params)
  }
}

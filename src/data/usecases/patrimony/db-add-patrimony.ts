import { AddPatrimony } from '@/domain/usecases'
import { AddPatrimonyRepository, CheckPatrimonyByFieldRepository } from '@/data/protocols'

export class DbAddPatrimony implements AddPatrimony {
  constructor (
    private readonly addPatrimonyRepository: AddPatrimonyRepository,
    private readonly checkPatrimonyByFieldRepository: CheckPatrimonyByFieldRepository
  ) {}

  async add (params: AddPatrimony.Params): Promise<AddPatrimony.Model> {
    if (!params.number) {
      return this.addPatrimonyRepository.add(params)
    }
    const exists = await this.checkPatrimonyByFieldRepository.checkByField({
      value: params.number,
      accountId: params.accountId
    })
    if (!exists) {
      return this.addPatrimonyRepository.add(params)
    }
    return null
  }
}

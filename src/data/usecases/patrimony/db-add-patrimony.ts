import { AddPatrimony } from '@/domain/usecases'
import { AddPatrimonyRepository, CheckPatrimonyByNumberRepository } from '@/data/protocols'

export class DbAddPatrimony implements AddPatrimony {
  constructor (
    private readonly addPatrimonyRepository: AddPatrimonyRepository,
    private readonly checkPatrimonyByNumberRepository: CheckPatrimonyByNumberRepository
  ) {}

  async add (params: AddPatrimony.Params): Promise<AddPatrimony.Model> {
    if (!params.number) {
      return this.addPatrimonyRepository.add(params)
    }
    const exists = await this.checkPatrimonyByNumberRepository.checkByNumber({
      number: params.number,
      accountId: params.accountId
    })
    if (!exists) {
      return this.addPatrimonyRepository.add(params)
    }
    return null
  }
}

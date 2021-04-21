import { AddPatrimony } from '@/domain/usecases'
import { AddPatrimonyRepository, CheckPatrimonyByNumberRepository } from '@/data/protocols'

export class DbAddPatrimony implements AddPatrimony {
  constructor (
    private readonly addPatrimonyRepository: AddPatrimonyRepository,
    private readonly checkPatrimonyByNumberRepository: CheckPatrimonyByNumberRepository
  ) {}

  async add (params: AddPatrimony.Params): Promise<AddPatrimony.Model> {
    const exists = await this.checkPatrimonyByNumberRepository.checkByNumber(params.number)
    if (!exists) {
      return this.addPatrimonyRepository.add(params)
    }
    return null
  }
}

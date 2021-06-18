import { AddSector } from '@/domain/usecases'
import { AddSectorRepository, CheckDataByFieldRepository } from '@/data/protocols'

export class DbAddSector implements AddSector {
  constructor (
    private readonly addSectorRepository: AddSectorRepository,
    private readonly checkSectorNameByFieldRepository: CheckDataByFieldRepository
  ) {}

  async add (params: AddSector.Params): Promise<AddSector.Model> {
    const exists = await this.checkSectorNameByFieldRepository.checkByField({
      value: params.name,
      accountId: params.accountId
    })
    if (!exists) {
      return this.addSectorRepository.add(params)
    }
    return null
  }
}

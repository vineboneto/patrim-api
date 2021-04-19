import { SavePatrimony } from '@/domain/usecases'
import { AddPatrimonyRepository, CheckPatrimonyByNumberRepository, UpdatePatrimonyRepository } from '@/data/protocols'

export class DbSavePatrimony implements SavePatrimony {
  constructor (
    private readonly addPatrimonyRepository: AddPatrimonyRepository,
    private readonly updatePatrimonyRepository: UpdatePatrimonyRepository,
    private readonly checkPatrimonyByNumberRepository: CheckPatrimonyByNumberRepository
  ) {}

  async save (params: SavePatrimony.Params): Promise<SavePatrimony.Model> {
    const exists = await this.checkPatrimonyByNumberRepository.checkByNumber(params.number)
    if (!exists) {
      if (params.id) {
        return this.updatePatrimonyRepository.update({ id: params.id, ...params })
      }
      return this.addPatrimonyRepository.add(params)
    }
    return null
  }
}

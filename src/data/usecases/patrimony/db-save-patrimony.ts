import { SavePatrimony } from '@/domain/usecases'
import { AddPatrimonyRepository, UpdatePatrimonyRepository } from '@/data/protocols'

export class DbSavePatrimony implements SavePatrimony {
  constructor (
    private readonly addPatrimonyRepository: AddPatrimonyRepository,
    private readonly updatePatrimonyRepository: UpdatePatrimonyRepository
  ) {}

  async save (params: SavePatrimony.Params): Promise<SavePatrimony.Model> {
    if (params.id) {
      return this.updatePatrimonyRepository.update({ id: params.id, ...params })
    }
    return this.addPatrimonyRepository.add(params)
  }
}

import { SavePatrimony } from '@/domain/usecases'
import { AddPatrimonyRepository } from '@/data/protocols'

export class DbSavePatrimony implements SavePatrimony {
  constructor (
    private readonly addPatrimonyRepository: AddPatrimonyRepository
  ) {}

  async save (params: SavePatrimony.Params): Promise<SavePatrimony.Model> {
    return this.addPatrimonyRepository.add(params)
  }
}

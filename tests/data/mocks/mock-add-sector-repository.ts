import { AddSectorRepository } from '@/data/protocols'

export class AddSectorRepositorySpy implements AddSectorRepository {
  params: AddSectorRepository.Params
  result = true

  async addSector (params: AddSectorRepository.Params): Promise<AddSectorRepository.Result> {
    this.params = params
    return Promise.resolve(this.result)
  }
}

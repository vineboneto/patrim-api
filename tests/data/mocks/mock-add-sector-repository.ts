import { AddSectorRepository } from '@/data/protocols/'

export class AddSectorRepositorySpy implements AddSectorRepository {
  params: AddSectorRepository.Params
  result = true
  async addSector (sector: AddSectorRepository.Params): Promise<AddSectorRepository.Result> {
    this.params = sector
    return this.result
  }
}

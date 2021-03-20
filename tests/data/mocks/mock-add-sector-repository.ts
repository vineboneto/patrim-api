import { AddSectorRepository } from '@/data/protocols/add-sector-repository'

export class AddSectorRepositorySpy implements AddSectorRepository {
  params: AddSectorRepository.Params
  result = true
  async addSector (sector: AddSectorRepository.Params): Promise<AddSectorRepository.Result> {
    this.params = sector
    return this.result
  }
}

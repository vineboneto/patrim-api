import { AddSector, Params, Result } from '../../domain/usecases/add-sector'
import { AddSectorRepository } from '../protocols/add-sector-repository'

export class DbAddSector implements AddSector {
  private readonly addSectorRepository: AddSectorRepository

  constructor (addSectorRepository: AddSectorRepository) {
    this.addSectorRepository = addSectorRepository
  }

  async add (sector: Params): Promise<Result> {
    await this.addSectorRepository.addSector(sector)
    return Promise.resolve(true)
  }
}

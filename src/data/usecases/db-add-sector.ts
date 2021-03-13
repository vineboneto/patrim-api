import { AddSector } from '@/domain/usecases'
import { AddSectorRepository } from '@/data/protocols'

export class DbAddSector implements AddSector {
  private readonly addSectorRepository: AddSectorRepository

  constructor (addSectorRepository: AddSectorRepository) {
    this.addSectorRepository = addSectorRepository
  }

  async add (sector: AddSector.Params): Promise<AddSector.Result> {
    const isValid = await this.addSectorRepository.addSector(sector)
    return Promise.resolve(isValid)
  }
}

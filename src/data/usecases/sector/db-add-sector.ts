import { AddSector } from '@/domain/usecases/'
import { AddSectorRepository, CheckSectorByNameRepository } from '@/data/protocols'

export class DbAddSector implements AddSector {
  private readonly addSectorRepository: AddSectorRepository
  private readonly checkSectorByNameRepository: CheckSectorByNameRepository

  constructor (
    addSectorRepository: AddSectorRepository,
    checkSectorByNameRepository: CheckSectorByNameRepository
  ) {
    this.addSectorRepository = addSectorRepository
    this.checkSectorByNameRepository = checkSectorByNameRepository
  }

  async add (sector: AddSector.Params): Promise<AddSector.Result> {
    const exists = await this.checkSectorByNameRepository.checkByName(sector.name)
    let isValid = false
    if (!exists) {
      isValid = await this.addSectorRepository.add(sector)
    }
    return isValid
  }
}

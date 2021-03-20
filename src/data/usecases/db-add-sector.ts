import { AddSector } from '@/domain/usecases/add-sector'
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
    const isValid = await this.addSectorRepository.addSector(sector)
    await this.checkSectorByNameRepository.checkByName(sector.name)
    return isValid
  }
}

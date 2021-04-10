import { SaveSector } from '@/domain/usecases'
import { CheckSectorByNameRepository, SaveSectorRepository } from '@/data/protocols'

export class DbSaveSector implements SaveSector {
  constructor (
    private readonly saveSectorRepository: SaveSectorRepository,
    private readonly checkSectorByNameRepository: CheckSectorByNameRepository
  ) {}

  async save (sector: SaveSector.Params): Promise<SaveSector.Result> {
    const exists = await this.checkSectorByNameRepository.checkByName(sector.name)
    let isValid = false
    if (!exists) {
      isValid = await this.saveSectorRepository.save(sector)
    }
    return isValid
  }
}

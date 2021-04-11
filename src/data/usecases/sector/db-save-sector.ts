import { SaveSector } from '@/domain/usecases'
import { CheckSectorByNameRepository, UpdateSectorRepository } from '@/data/protocols'

export class DbSaveSector implements SaveSector {
  constructor (
    private readonly updateSectorRepository: UpdateSectorRepository,
    private readonly checkSectorByNameRepository: CheckSectorByNameRepository
  ) {}

  async save (sector: SaveSector.Params): Promise<SaveSector.Result> {
    const { id, name } = sector
    const exists = await this.checkSectorByNameRepository.checkByName(name)
    let isValid = false
    if (!exists) {
      if (id) {
        isValid = await this.updateSectorRepository.update({ id, name })
      }
    }
    return isValid
  }
}

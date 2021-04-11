import { SaveSector } from '@/domain/usecases'
import { AddSectorRepository, CheckSectorByNameRepository, UpdateSectorRepository } from '@/data/protocols'

export class DbSaveSector implements SaveSector {
  constructor (
    private readonly updateSectorRepository: UpdateSectorRepository,
    private readonly addSectorRepository: AddSectorRepository,
    private readonly checkSectorByNameRepository: CheckSectorByNameRepository
  ) {}

  async save (sector: SaveSector.Params): Promise<SaveSector.Result> {
    const { id, name } = sector
    const exists = await this.checkSectorByNameRepository.checkByName(name)
    let isValid = false
    if (!exists) {
      id
        ? isValid = await this.updateSectorRepository.update({ id, name })
        : isValid = await this.addSectorRepository.add({ name })
    }
    return isValid
  }
}

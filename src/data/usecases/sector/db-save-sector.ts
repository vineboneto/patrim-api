import { SaveSector } from '@/domain/usecases'
import { AddSectorRepository, CheckSectorByNameRepository, UpdateSectorRepository } from '@/data/protocols'

export class DbSaveSector implements SaveSector {
  constructor (
    private readonly updateSectorRepository: UpdateSectorRepository,
    private readonly addSectorRepository: AddSectorRepository,
    private readonly checkSectorByNameRepository: CheckSectorByNameRepository
  ) {}

  async save (sector: SaveSector.Params): Promise<SaveSector.Model> {
    const { id, name } = sector
    const exists = await this.checkSectorByNameRepository.checkByName(name)
    let sectorModel = null
    if (!exists) {
      id
        ? sectorModel = await this.updateSectorRepository.update({ id, name })
        : sectorModel = await this.addSectorRepository.add({ name })
    }
    return sectorModel
  }
}

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
    if (!exists) {
      if (id) {
        return this.updateSectorRepository.update({ id, name })
      }
      return this.addSectorRepository.add({ name })
    }
    return null
  }
}

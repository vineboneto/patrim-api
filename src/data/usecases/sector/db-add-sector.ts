import { AddSector } from '@/domain/usecases'
import { AddSectorRepository, CheckSectorByNameRepository } from '@/data/protocols'

export class DbAddSector implements AddSector {
  constructor (
    private readonly addSectorRepository: AddSectorRepository,
    private readonly checkSectorByNameRepository: CheckSectorByNameRepository
  ) {}

  async add (params: AddSector.Params): Promise<AddSector.Model> {
    const exists = await this.checkSectorByNameRepository.checkByName(params.name)
    if (!exists) {
      return this.addSectorRepository.add(params)
    }
    return null
  }
}

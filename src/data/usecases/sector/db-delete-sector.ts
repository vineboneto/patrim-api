import { DeleteSectorRepository, LoadSectorByIdRepository } from '@/data/protocols'
import { DeleteSector } from '@/domain/usecases'

export class DbDeleteSector implements DeleteSector {
  constructor (
    private readonly deleteSectorRepository: DeleteSectorRepository,
    private readonly loadSectorByIdRepository: LoadSectorByIdRepository
  ) {}

  async delete (params: DeleteSector.Params): Promise<DeleteSector.Model> {
    const exists = await this.loadSectorByIdRepository.loadById(params.id)
    if (exists) {
      return this.deleteSectorRepository.delete(params.id)
    }
    return null
  }
}

import { DeleteSectorRepository, CheckSectorByIdRepository } from '@/data/protocols'
import { DeleteSector } from '@/domain/usecases'

export class DbDeleteSector implements DeleteSector {
  constructor (
    private readonly deleteSectorRepository: DeleteSectorRepository,
    private readonly checkSectorByIdRepository: CheckSectorByIdRepository
  ) {}

  async delete (params: DeleteSector.Params): Promise<DeleteSector.Model> {
    const exists = await this.checkSectorByIdRepository.checkById(params.id)
    if (exists) {
      return this.deleteSectorRepository.delete(params.id)
    }
    return null
  }
}

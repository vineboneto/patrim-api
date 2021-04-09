import { DeleteSectorRepository } from '@/data/protocols'
import { DeleteSector } from '@/domain/usecases'

export class DbDeleteSector implements DeleteSector {
  constructor (
    private readonly deleteSectorRepository: DeleteSectorRepository
  ) {}

  async delete (params: DeleteSector.Params): Promise<DeleteSector.Result> {
    await this.deleteSectorRepository.delete(params.id)
    return null
  }
}

import { DeleteSectorRepository, CheckOwnerBySectorIdRepository } from '@/data/protocols'
import { DeleteSector } from '@/domain/usecases'

export class DbDeleteSector implements DeleteSector {
  constructor (
    private readonly deleteSectorRepository: DeleteSectorRepository,
    private readonly checkOwnerBySectorIdIdRepository: CheckOwnerBySectorIdRepository
  ) {}

  async delete (params: DeleteSector.Params): Promise<DeleteSector.Model> {
    const { id } = params
    const exists = await this.checkOwnerBySectorIdIdRepository.checkBySectorId({
      sectorId: id
    })
    if (!exists) {
      return this.deleteSectorRepository.delete({ id })
    }
    return null
  }
}

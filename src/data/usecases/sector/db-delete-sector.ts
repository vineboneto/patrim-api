import { DeleteSectorRepository, CheckDataByFieldRepository } from '@/data/protocols'
import { DeleteSector } from '@/domain/usecases'

export class DbDeleteSector implements DeleteSector {
  constructor (
    private readonly deleteSectorRepository: DeleteSectorRepository,
    private readonly checkOwnerBySectorIdIdRepository: CheckDataByFieldRepository
  ) {}

  async delete (params: DeleteSector.Params): Promise<DeleteSector.Model> {
    const { id, accountId } = params
    const exists = await this.checkOwnerBySectorIdIdRepository.checkByField({
      value: id,
      accountId
    })
    if (!exists) {
      return this.deleteSectorRepository.delete({ id, accountId })
    }
    return null
  }
}

import { DeleteSectorRepository, CheckSectorByIdRepository } from '@/data/protocols'
import { DeleteSector } from '@/domain/usecases'

export class DbDeleteSector implements DeleteSector {
  constructor (
    private readonly deleteSectorRepository: DeleteSectorRepository,
    private readonly checkSectorByIdRepository: CheckSectorByIdRepository
  ) {}

  async delete (params: DeleteSector.Params): Promise<DeleteSector.Model> {
    const { id } = params
    const exists = await this.checkSectorByIdRepository.checkById({ id })
    if (exists) {
      return this.deleteSectorRepository.delete({ id })
    }
    return null
  }
}

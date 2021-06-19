import { CheckDataByFieldRepository, UpdateSectorRepository, LoadDataFieldByIdRepository } from '@/data/protocols'
import { UpdateSector } from '@/domain/usecases'

export class DbUpdateSector implements UpdateSector {
  constructor (
    private readonly updateSectorRepository: UpdateSectorRepository,
    private readonly loadSectorNameByIdRepository: LoadDataFieldByIdRepository,
    private readonly checkSectorNameByFieldRepository: CheckDataByFieldRepository
  ) {}

  async update (params: UpdateSector.Params): Promise<UpdateSector.Model> {
    const { name } = await this.loadSectorNameByIdRepository.loadFieldById(params.id)
    if (name !== params.name) {
      const exists = await this.checkSectorNameByFieldRepository.checkByField({
        value: params.name,
        accountId: params.accountId
      })
      if (exists) {
        return null
      }
    }
    return this.updateSectorRepository.update(params)
  }
}

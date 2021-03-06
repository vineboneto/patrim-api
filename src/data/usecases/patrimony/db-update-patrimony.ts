import { UpdatePatrimony } from '@/domain/usecases'
import {
  CheckDataByFieldRepository,
  LoadDataFieldByIdRepository,
  UpdatePatrimonyRepository
} from '@/data/protocols'

export class DbUpdatePatrimony implements UpdatePatrimony {
  constructor (
    private readonly updatePatrimonyRepository: UpdatePatrimonyRepository,
    private readonly loadPatrimonyNumberByIdRepository: LoadDataFieldByIdRepository,
    private readonly checkPatrimonyByFieldRepository: CheckDataByFieldRepository
  ) {}

  async update (params: UpdatePatrimony.Params): Promise<UpdatePatrimony.Model> {
    if (!params.number) {
      return this.updatePatrimonyRepository.update(params)
    }
    const data = await this.loadPatrimonyNumberByIdRepository.loadFieldById(params.id)
    if (data?.number !== params.number) {
      const exists = await this.checkPatrimonyByFieldRepository.checkByField({
        value: params.number,
        accountId: params.accountId
      })
      if (exists) {
        return null
      }
    }
    return this.updatePatrimonyRepository.update(params)
  }
}

import { UpdatePatrimony } from '@/domain/usecases'
import {
  CheckPatrimonyByNumberRepository,
  LoadPatrimonyFieldByIdRepository,
  UpdatePatrimonyRepository
} from '@/data/protocols'

export class DbUpdatePatrimony implements UpdatePatrimony {
  constructor (
    private readonly updatePatrimonyRepository: UpdatePatrimonyRepository,
    private readonly loadPatrimonyNumberByIdRepository: LoadPatrimonyFieldByIdRepository,
    private readonly checkPatrimonyByNumberRepository: CheckPatrimonyByNumberRepository
  ) {}

  async update (params: UpdatePatrimony.Params): Promise<UpdatePatrimony.Model> {
    if (!params.number) {
      return this.updatePatrimonyRepository.update(params)
    }
    const number = await this.loadPatrimonyNumberByIdRepository.loadFieldById(params.id)
    if (number !== params.number) {
      const exists = await this.checkPatrimonyByNumberRepository.checkByNumber({
        number: params.number,
        accountId: params.accountId
      })
      if (exists) {
        return null
      }
    }
    return this.updatePatrimonyRepository.update(params)
  }
}

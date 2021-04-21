import { UpdatePatrimony } from '@/domain/usecases'
import {
  CheckPatrimonyByNumberRepository,
  LoadPatrimonyNumberByIdRepository,
  UpdatePatrimonyRepository
} from '@/data/protocols'

export class DbUpdatePatrimony implements UpdatePatrimony {
  constructor (
    private readonly updatePatrimonyRepository: UpdatePatrimonyRepository,
    private readonly loadPatrimonyNumberByIdRepository: LoadPatrimonyNumberByIdRepository,
    private readonly checkPatrimonyByNumberRepository: CheckPatrimonyByNumberRepository
  ) {}

  async update (params: UpdatePatrimony.Params): Promise<UpdatePatrimony.Model> {
    const { number } = await this.loadPatrimonyNumberByIdRepository.loadNumberById(params.id)
    if (number !== params.number) {
      const exists = await this.checkPatrimonyByNumberRepository.checkByNumber(params.number)
      if (exists) {
        return null
      }
    }
    return this.updatePatrimonyRepository.update(params)
  }
}
